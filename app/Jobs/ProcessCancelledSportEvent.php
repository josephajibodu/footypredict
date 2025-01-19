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

class ProcessCancelledSportEvent implements ShouldQueue
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
        if (! in_array($this->sportEvent->status, [SportEventStatus::Postponed, SportEventStatus::Cancelled])) {
            throw new Exception("Match ID {$this->sportEvent->id} JOB cannot be processed because status is not cancelled.");
        }

        $this->sportEvent->bets()->each(function (Bet $bet) {
            Log::channel(LogChannel::SportEvent->value)->info("[ProcessCancelledSportEventJob] Downgrade Multiplier: Dispatching Bet Downgrader for [ bet ($bet->reference) - event ($this->sportEvent->id) ]", $bet->toArray());

            ProcessBetForCancelledSportEvent::dispatch($bet, $this->sportEvent);
        });
    }
}
