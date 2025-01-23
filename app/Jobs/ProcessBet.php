<?php

namespace App\Jobs;

use App\Actions\Transactions\CreateWinningPayout;
use App\Enums\BetStatus;
use App\Enums\LogChannel;
use App\Enums\SportEventStatus;
use App\Models\Bet;
use App\Models\SportEvent;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessBet implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Bet $bet,
        public SportEvent $sportEvent
    )
    {}

    /**
     * Execute the job.
     * @throws Exception
     */
    public function handle(CreateWinningPayout $createWinningPayout): void
    {
        try {
            Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Processing bet after event: {$this->sportEvent->id}", [
                'bet_id' => $this->bet->reference,
            ]);

            if ($this->bet->status !== BetStatus::Pending) {
                Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Bet will not be processed. Status = {$this->bet->status->value}", [
                    'bet_id' => $this->bet->reference,
                ]);
                return;
            }

            DB::transaction(function () use ($createWinningPayout) {
                $lostMatches = 0;
                $unCompletedCount = 0;

                $maxAllowedLosses = 0;
                if ($this->bet->multiplier_settings['allow_flex']) {
                    if ($this->bet->multiplier_settings['flex_2'] !== null) {
                        $maxAllowedLosses = 2;
                    } elseif ($this->bet->multiplier_settings['flex_1'] !== null) {
                        $maxAllowedLosses = 1;
                    }
                }

                foreach ($this->bet->sportEvents as $sportEvent) {
                    if (in_array($sportEvent->status, [SportEventStatus::Pending, SportEventStatus::InProgress])) {
                        $unCompletedCount++;
                        continue;
                    }

                    if (in_array($sportEvent->status, [SportEventStatus::Postponed, SportEventStatus::Cancelled])) {
                        Log::channel(LogChannel::BetProcessing->value)->debug("[ProcessBetJob] Skipping postponed or cancelled event", [
                            'bet_id' => $this->bet->reference,
                            'sport_event_id' => $sportEvent->id,
                            'event_status' => $sportEvent->status,
                        ]);
                        continue;
                    }

                    $pivotData = $sportEvent->pivot;

                    if ($pivotData->selected_option_id !== $pivotData->outcome_option_id) {
                        $lostMatches++;
                    }

                    if (! $this->bet->is_flexed && $lostMatches > 0) {
                        $this->markBetAsLost();
                        return;
                    }

                    if ($this->bet->is_flexed && $lostMatches > $maxAllowedLosses) {
                        Log::info("The number of lost matches $lostMatches, and max allowed loss is $maxAllowedLosses");
                        $this->markBetAsLost();
                        return;
                    }
                }

                if ($unCompletedCount > 0) {
                    Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Bet processing incomplete due to uncompleted matches", [
                        'bet_id' => $this->bet->reference,
                        'uncompleted_count' => $unCompletedCount,
                        'sport_event_id' => $this->sportEvent->id,
                        'uncompleted_sport_event_ids' => $this->bet->sportEvents
                            ->filter(fn($event) => in_array($event->status, [SportEventStatus::Pending, SportEventStatus::InProgress]))
                            ->pluck('id')
                            ->toArray(),
                    ]);
                    return;
                }

                $this->markBetAsWon($createWinningPayout, $lostMatches);
            });
        } catch (Exception $ex) {
            Log::channel(LogChannel::BetProcessing->value)->error("[ProcessBetJob] Bet processing failed", [
                'bet_id' => $this->bet->reference,
                'error' => $ex->getMessage(),
                'trace' => $ex->getTraceAsString(),
            ]);

            throw $ex;
        }
    }

    /**
     * Mark the bet as lost and save.
     */
    private function markBetAsLost(): void
    {
        $this->bet->status = BetStatus::Lost;
        $this->bet->save();

        Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Bet marked as lost", [
            'bet_id' => $this->bet->reference,
            'sport_event_id' => $this->sportEvent->id
        ]);
    }

    /**
     * Mark the bet as won and save.
     * @throws Exception
     */
    private function markBetAsWon(CreateWinningPayout $createWinningPayout, int $lostMatches): void
    {
        $this->bet->status = BetStatus::Won;

        $multiplierSettings = $this->bet->multiplier_settings;

        if ($this->bet->is_flexed) {
            $allowedLossKey = "flex_{$lostMatches}";
            $amountWon = $this->bet->stake * $multiplierSettings[$allowedLossKey];
        } else {
            $amountWon = $this->bet->stake * $multiplierSettings['main'];
        }

        $this->bet->potential_winnings = $amountWon;
        $this->bet->save();

        Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Bet marked as won", [
            'bet_id' => $this->bet->reference,
            'amount_won' => $amountWon,
        ]);

        $createWinningPayout($this->bet, $amountWon / 100, "Bet winning payout");
    }
}
