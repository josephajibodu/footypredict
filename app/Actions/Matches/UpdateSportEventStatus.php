<?php

namespace App\Actions\Matches;

use App\Enums\LogChannel;
use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
use App\Jobs\ProcessCancelledSportEvent;
use App\Jobs\ProcessCompletedSportEvent;
use App\Models\Option;
use App\Models\SportEvent;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateSportEventStatus
{
    /**
     * Update the status of the match.
     *
     * @throws Exception
     */
    public function __invoke(SportEvent $match, SportEventStatus $status): SportEvent
    {
        if ($status === SportEventStatus::Completed && ! $this->canComplete($match)) {
            throw new Exception("Match ID {$match->id} cannot be completed. Ensure all necessary conditions are met.");
        }

        DB::beginTransaction();
        try {
            $match->update(['status' => $status]);

            Log::channel(LogChannel::SportEvent->value)->info("Match ID {$match->id} status updated to {$status->value}.");

            if ($this->isFailedState($status)) {
                $this->cancelSportEvent($match);
            }

            if ($match->status === SportEventStatus::Completed) {
                $this->completeSportEvent($match);
            }

            DB::commit();

            return $match->refresh();
        } catch (Exception $ex) {
            DB::rollBack();

            report($ex);
            throw $ex;
        }
    }

    /**
     * Explicitly complete the match.
     */
    protected function completeSportEvent(SportEvent $sportEvent): void
    {
        $outcomeMap = match (true) {
            $sportEvent->team1_score > $sportEvent->team2_score => [
                MatchOption::HOME_WIN->value => true,
                MatchOption::AWAY_WIN->value => false,
                MatchOption::DRAW->value => false,
            ],
            $sportEvent->team2_score > $sportEvent->team1_score => [
                MatchOption::AWAY_WIN->value => true,
                MatchOption::HOME_WIN->value => false,
                MatchOption::DRAW->value => false,
            ],
            default => [
                MatchOption::DRAW->value => true,
                MatchOption::AWAY_WIN->value => false,
                MatchOption::HOME_WIN->value => false,
            ],
        };

        $sportEvent->options->each(function (Option $betOption) use ($outcomeMap) {
            $betOption->value = $outcomeMap[$betOption->type->value] ?? false;
            $betOption->save();
        });

        Log::channel(LogChannel::SportEvent->value)->info("Match ID {$sportEvent->id} has been marked as completed(either of the completed status).");

        ProcessCompletedSportEvent::dispatch($sportEvent);
    }

    /**
     * Explicitly process cancelled match.
     */
    protected function cancelSportEvent(SportEvent $sportEvent): void
    {
        $sportEvent->options->each(function (Option $betOption) {
            $betOption->value = false;
            $betOption->save();
        });

        Log::channel(LogChannel::SportEvent->value)->info("Match ID {$sportEvent->id} has been marked as cancelled(canceled or postponed).");

        ProcessCancelledSportEvent::dispatch($sportEvent);
    }

    protected function canComplete(SportEvent $match): bool
    {
        if (is_null($match->team1_score) || is_null($match->team2_score)) {
            return false;
        }

        return in_array($match->status, [SportEventStatus::Pending, SportEventStatus::InProgress]);
    }

    protected function isFailedState(SportEventStatus $status): bool
    {
        return in_array($status, [SportEventStatus::Cancelled, SportEventStatus::Postponed]);
    }
}
