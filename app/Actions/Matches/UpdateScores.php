<?php

namespace App\Actions\Matches;

use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
use App\Models\Option;
use App\Models\SportEvent; // Assuming the 'Option' model for match outcomes
use Illuminate\Database\Eloquent\Model;

class UpdateScores
{
    /**
     * Update the scores and set the match outcomes.
     */
    public function __invoke(SportEvent|Model $match, array $data): SportEvent
    {
        $match->team1_score = $data['team1_score'];
        $match->team2_score = $data['team2_score'];

        // Determine the outcome
        $outcome = $this->determineOutcome($match->team1_score, $match->team2_score);

        // Update the match status
        $match->status = SportEventStatus::Completed;

        // Save the updated match
        $match->save();

        // Update match outcome options
        $this->updateMatchOptions($match, $outcome);

        return $match->refresh();
    }

    /**
     * Determine the match outcome based on the scores.
     */
    private function determineOutcome(int $team1Score, int $team2Score): array
    {
        if ($team1Score > $team2Score) {
            return [
                MatchOption::HOME_WIN->value => true,
                MatchOption::DRAW->value => false,
                MatchOption::AWAY_WIN->value => false,
            ];
        } elseif ($team1Score === $team2Score) {
            return [
                MatchOption::HOME_WIN->value => false,
                MatchOption::DRAW->value => true,
                MatchOption::AWAY_WIN->value => false,
            ];
        } else {
            return [
                MatchOption::HOME_WIN->value => false,
                MatchOption::DRAW->value => false,
                MatchOption::AWAY_WIN->value => true,
            ];
        }
    }

    /**
     * Update the match outcome options.
     */
    private function updateMatchOptions(SportEvent $match, array $outcome): void
    {
        // Update each option with the outcome
        foreach ($outcome as $type => $value) {
            $match->options()
                ->where('type', $type)
                ->update(['value' => $value]);
        }
    }
}
