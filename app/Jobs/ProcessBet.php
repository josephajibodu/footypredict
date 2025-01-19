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
    public function __construct(public Bet $bet, public SportEvent $sportEvent)
    {}

    /**
     * Execute the job.
     * @throws Exception
     */
    public function handle(CreateWinningPayout $createWinningPayout): void
    {
        Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Processing bet after event: $this->sportEvent->id", [
            'bet_id' => $this->bet->reference,
        ]);

        if ($this->bet->status !== BetStatus::Pending) {
            Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Bet will not be processed. Status = {$this->bet->status->value}", [
                'bet_id' => $this->bet->reference,
            ]);
            return;
        }

        DB::beginTransaction();
        try {
            $lostEvents = $this->getLostEvents();
            $unCompletedEvents = $this->getUncompletedEvents();

            if (! empty($unCompletedEvents)) {
                return;
            }

            $this->updateBetStatus($lostEvents, $createWinningPayout);
            $this->bet->save();

            DB::commit();
        } catch (Exception $ex) {
            DB::rollBack();

            Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Bet processing failed", [
                'bet_id' => $this->bet->reference,
                'sport_event' => $this->sportEvent->id,
            ]);

            throw $ex;
        }
    }

    private function getLostEvents(): array
    {
        $lostEvents = [];

        foreach ($this->bet->sportEvents as $sportEvent) {
            // Only compute for the completed events
            if ($sportEvent->status !== SportEventStatus::Completed) {
                continue;
            }

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
            if (! in_array($sportEvent->status, [SportEventStatus::Completed, SportEventStatus::Postponed, SportEventStatus::Cancelled])) {
                $unCompletedEvents[] = $sportEvent->id;
                break;
            }
        }

        return $unCompletedEvents;
    }

    /**
     * @throws Exception
     */
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

    /**
     * @throws Exception
     */
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

    /**
     * @throws Exception
     */
    private function processWinningBet(array $multiplierSettings, CreateWinningPayout $createWinningPayout): void
    {
        $amountWon = $this->bet->stake * $multiplierSettings['main'];
        $this->bet->potential_winnings = $amountWon;

        Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Processing non-flexed bet win", [
            'bet_id' => $this->bet->reference,
            'multiplier' => $multiplierSettings,
            'amount_won' => $amountWon
        ]);

        $createWinningPayout($this->bet->user, $amountWon / 100, "Bet winning payout");
    }

    /**
     * @throws Exception
     */
    private function processFlexedBet(int $noOfLostEvents, array $multiplierSettings, CreateWinningPayout $createWinningPayout): void
    {
        $allowedLossKey = "flex_{$noOfLostEvents}";

        if ($noOfLostEvents <= 2 && isset($multiplierSettings[$allowedLossKey])) {
            $this->bet->status = BetStatus::Won;
            $amountWon = $this->bet->stake * $multiplierSettings[$allowedLossKey];
            $this->bet->potential_winnings = $amountWon;

            Log::channel(LogChannel::BetProcessing->value)->info("[ProcessBetJob] Processing flexed bet win", [
                'bet_id' => $this->bet->reference,
                'multiplier' => $multiplierSettings,
                'amount_won' => $amountWon
            ]);
            $createWinningPayout($this->bet->user, $amountWon / 100, "Bet winning payout");
        } else {
            $this->bet->status = BetStatus::Lost;
        }
    }
}
