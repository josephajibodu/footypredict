<?php

namespace App\Actions\Matches;

use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
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
        if ($match->status === SportEventStatus::Completed && ! $this->canComplete($match)) {
            throw new Exception("Match ID {$match->id} cannot be completed. Ensure all necessary conditions are met.");
        }

        return DB::transaction(function () use ($status, $match) {
            $match->update(['status' => $status]);

            Log::info("Match ID {$match->id} status updated to {$status->value}.");

            if ($this->isCompleteState($status)) {
                $this->completeSportEvent($match);
            }

            if ($match->status === SportEventStatus::Completed) {
                $this->completeSportEvent($match);
            }

            return $match->refresh();
        });
    }

    /**
     * Explicitly completeSportEvent the match.
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

        Log::info("Match ID {$sportEvent->id} has been marked as completed(either of the completed status).");

        ProcessCompletedSportEvent::dispatch($sportEvent);
    }

    protected function canComplete(SportEvent $match): bool
    {
        if (is_null($match->team1_score) || is_null($match->team2_score)) {
            return false;
        }

        return in_array($match->status, [SportEventStatus::Pending, SportEventStatus::InProgress]);
    }

    protected function isCompleteState(SportEventStatus $status): bool
    {
        return in_array($status, [SportEventStatus::Completed, SportEventStatus::Cancelled, SportEventStatus::Postponed]);
    }
}
