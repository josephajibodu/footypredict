<?php

namespace App\Jobs;

use App\Actions\Transactions\CreateWinningPayout;
use App\Enums\BetStatus;
use App\Enums\SportEventStatus;
use App\Models\Bet;
use App\Models\SportEvent;
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
    public function __construct(public Bet $bet, public SportEvent $sportEvent)
    {}

    /**
     * Execute the job.
     */
    public function handle(CreateWinningPayout $createWinningPayout): void
    {
        Log::info("Processing bet after event: $this->sportEvent->id");

        if ($this->bet->status !== BetStatus::Pending) {
            Log::info("Bet will not be processed. Status = {$this->bet->status->value}", $this->bet->toArray());
            return;
        }

        DB::transaction(function () use ($createWinningPayout) {
            $lostEvents = $this->getLostEvents();
            $unCompletedEvents = $this->getUncompletedEvents();

            if (! empty($unCompletedEvents)) {
                return;
            }

            $this->updateBetStatus($lostEvents, $createWinningPayout);
            $this->bet->save();
        });
    }

    private function getLostEvents(): array
    {
        $lostEvents = [];

        foreach ($this->bet->sportEvents as $sportEvent) {
            $pivotData = $sportEvent->pivot;

            if ($pivotData->selected_option_id !== $pivotData->outcome_option_id) {
                $lostEvents[] = $sportEvent->id;
            }
        }

        return $lostEvents;
    }

    private function getUncompletedEvents(): array
    {
        $unCompletedEvents = [];

        foreach ($this->bet->sportEvents as $sportEvent) {
            if ($sportEvent->status !== SportEventStatus::Completed) {
                $unCompletedEvents[] = $sportEvent->id;
                break;
            }
        }

        return $unCompletedEvents;
    }

    private function updateBetStatus(array $lostEvents, CreateWinningPayout $createWinningPayout): void
    {
        $noOfLostEvents = count($lostEvents);
        $multiplierSettings = $this->bet->multiplier_settings;

        if (!$this->bet->is_flexed) {
            $this->bet->status = $noOfLostEvents > 0 ? BetStatus::Lost : BetStatus::Won;

            if ($this->bet->status === BetStatus::Won) {
                $this->processWinningBet($multiplierSettings, $createWinningPayout);
            }
        } else {
            $this->handleFlexedBet($noOfLostEvents, $multiplierSettings, $createWinningPayout);
        }
    }

    private function handleFlexedBet(int $noOfLostEvents, array $multiplierSettings, CreateWinningPayout $createWinningPayout): void
    {
        $allowFlex = $multiplierSettings['allow_flex'] ?? false;

        if (!$allowFlex) {
            $this->bet->status = $noOfLostEvents > 0 ? BetStatus::Lost : BetStatus::Won;

            if ($this->bet->status === BetStatus::Won) {
                $this->processWinningBet($multiplierSettings, $createWinningPayout);
            }
        } else {
            $this->processFlexedBet($noOfLostEvents, $multiplierSettings, $createWinningPayout);
        }
    }

    private function processWinningBet(array $multiplierSettings, CreateWinningPayout $createWinningPayout): void
    {
        $amountWon = $this->bet->stake * $multiplierSettings['main'];
        $this->bet->potential_winnings = $amountWon;

        Log::info("Processing non-flexed bet win", $multiplierSettings, $amountWon);
        $createWinningPayout($this->bet->user, $amountWon / 100, "Bet winning payout");
    }

    private function processFlexedBet(int $noOfLostEvents, array $multiplierSettings, CreateWinningPayout $createWinningPayout): void
    {
        $allowedLossKey = "flex_{$noOfLostEvents}";

        if ($noOfLostEvents <= 2 && isset($multiplierSettings[$allowedLossKey])) {
            $this->bet->status = BetStatus::Won;
            $amountWon = $this->bet->stake * $multiplierSettings[$allowedLossKey];
            $this->bet->potential_winnings = $amountWon;

            Log::info("Processing flexed bet win", $multiplierSettings, $amountWon);
            $createWinningPayout($this->bet->user, $amountWon / 100, "Bet winning payout");
        } else {
            $this->bet->status = BetStatus::Lost;
        }
    }
}
