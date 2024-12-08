<?php

namespace App\Actions\Matches;

use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
use App\Models\SportEvent;
use App\Models\Option; // Assuming the 'Option' model for match outcomes
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Model;

class UpdateScores
{
    /**
     * Update the scores and set the match outcomes.
     *
     * @param SportEvent|Model $match
     * @param array $data
     * @return SportEvent
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
     *
     * @param int $team1Score
     * @param int $team2Score
     * @return array
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
     *
     * @param SportEvent $match
     * @param array $outcome
     * @return void
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