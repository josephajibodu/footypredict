<?php

namespace App\Jobs;

use App\Enums\LogChannel;
use App\Enums\SportEventStatus;
use App\Models\Bet;
use App\Models\BetSportEvent;
use App\Models\Option;
use App\Models\SportEvent;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ProcessCompletedSportEvent implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public SportEvent $sportEvent) {}

    /**
     * Execute the job.
     *
     * @throws Exception
     */
    public function handle(): void
    {
        if ($this->sportEvent->status !== SportEventStatus::Completed) {
            throw new Exception("Match ID {$this->sportEvent->id} JOB cannot be processed. Ensure all necessary conditions are met.");
        }

        $this->sportEvent->bets()->each(function (Bet $bet) {
            Log::channel(LogChannel::SportEvent->value)->info("[ProcessCompletedSportEventJob] Dispatching Bet Processor for [ bet ($bet->reference) - event ({$this->sportEvent->id}) ]", $bet->toArray());

            /** @var BetSportEvent $betSportEvent */
            $betSportEvent = BetSportEvent::query()->where('bet_id', $bet->id)
                ->where('sport_event_id', $this->sportEvent->id)
                ->first();

            /** @var Option $validOutcomeOption */
            $validOutcomeOption = $this->sportEvent->options()->where('value', true)->first();

            $betSportEvent->update(['outcome_option_id' => $validOutcomeOption->id]);

            ProcessBet::dispatch($bet, $this->sportEvent);
        });
    }
}
