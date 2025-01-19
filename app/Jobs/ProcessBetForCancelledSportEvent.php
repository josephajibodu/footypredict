<?php

namespace App\Jobs;

use App\Actions\Bets\CancelBet;
use App\Actions\Transactions\CreateWinningPayout;
use App\Enums\BetStatus;
use App\Enums\SportEventStatus;
use App\Models\Bet;
use App\Models\SportEvent;
use App\Settings\BetSetting;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessBetForCancelledSportEvent implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Bet $bet,
        public SportEvent $sportEvent,
    )
    {}

    /**
     * Execute the job.
     */
    public function handle(BetSetting $betSetting, CancelBet $cancelBet): void
    {
        Log::info("Downgrading bet after event: {$this->sportEvent->id} is cancelled");

        if ($this->bet->status !== BetStatus::Pending) {
            Log::info("Bet will not be processed. Status = {$this->bet->status->value}", $this->bet->toArray());
            return;
        }

        // get the number of selection for the current multiplier
        $multiplier_config = $this->bet->multiplier_settings;
        $currentSelectionCount = $multiplier_config['selection'];
        $newSelectionCount = $currentSelectionCount - 1;

        // get the next lower multiplier
        $multiplierSettings = $betSetting->selection_config;
        $validMultiplier = collect($multiplierSettings)->where('selection', $newSelectionCount)->first();

        if (! $validMultiplier) {
            $cancelBet($this->bet);
            return;
        }

        // if the next multiplier is less than the min selection, cancel bet
        if ($newSelectionCount < $betSetting->min_selection) {
            $cancelBet($this->bet);
            return;
        }

        // or it is equal to a selection that doesn't allow flex while the bet is flexed
        // Void the bet, refund the user and end it here. cancel bet
        if ($this->bet->is_flexed && !$validMultiplier['allow_flex']) {
            $cancelBet($this->bet);
            return;
        }

        // recalculate the bets potential_win (flexed or not)
        // call process bet just in case the cancelled match is the last
        $multiplier = $this->bet->is_flexed && $validMultiplier['allow_flex'] ? floatval($validMultiplier['flex_0']) : floatval($validMultiplier['main']);
        $this->bet->update([
            'multiplier_settings' => $validMultiplier,
            'potential_winnings' => $this->bet->stake * $multiplier
        ]);

        ProcessBet::dispatch($this->bet, $this->sportEvent);
    }

}
