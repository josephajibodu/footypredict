<?php

namespace App\Actions\Matches;

use App\Enums\SportEventStatus;
use App\Models\SportEvent;
use Illuminate\Support\Facades\Log;

class UpdateSportEventStatus
{
    /**
     * Update the status of the match.
     *
     * @param SportEvent $match
     * @param SportEventStatus $status
     * @return SportEvent
     */
    public function __invoke(SportEvent $match, SportEventStatus $status): SportEvent
    {
        // Update the status
        $match->status = $status;

        // Log the status update
        Log::info("Match ID {$match->id} status updated to {$status->value}.");

        // Save the updated match
        $match->save();

        return $match;
    }

    /**
     * Explicitly complete the match.
     *
     * @param SportEvent $match
     * @return SportEvent
     */
    public function complete(SportEvent $match): SportEvent
    {
        // Ensure the match can be completed
        if (!$this->canComplete($match)) {
            throw new \RuntimeException("Match ID {$match->id} cannot be completed. Ensure all necessary conditions are met.");
        }

        // Update status to completed
        $match->status = SportEventStatus::Completed;

        // Log the completion
        Log::info("Match ID {$match->id} has been marked as completed.");

        // Save the updated match
        $match->save();

        return $match;
    }

    /**
     * Check if the match can be completed.
     *
     * @param SportEvent $match
     * @return bool
     */
    protected function canComplete(SportEvent $match): bool
    {
        // Example check: Ensure the match is not pending or cancelled
        return !in_array($match->status, [SportEventStatus::Pending, SportEventStatus::Cancelled]);
    }
}