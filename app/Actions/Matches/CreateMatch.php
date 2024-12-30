<?php

namespace App\Actions\Matches;

use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use App\Models\SportEvent;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

class CreateMatch
{
    /**
     * Create a new match (sport event).
     *
     * @throws Exception
     */
    public function __invoke(array $data): SportEvent
    {
        // Parse date and time
        $matchDate = Carbon::parse($data['match_date']);
        $kickoffTime = Carbon::parse($data['kickoff_time']);

        // Validate if a match with the same teams exists on the same date
        $exists = SportEvent::query()->whereDate('match_date', $matchDate)
            ->where(function ($query) use ($data) {
                $query->where('team1_id', $data['team1_id'])
                    ->orWhere('team2_id', $data['team1_id'])
                    ->orWhere('team1_id', $data['team2_id'])
                    ->orWhere('team2_id', $data['team2_id']);
            })
            ->exists();

        if ($exists) {
            throw new Exception('A match involving one or both of these teams already exists on this date.');
        }

        return DB::transaction(function () use ($data, $kickoffTime, $matchDate) {
            $event = SportEvent::query()->create([
                'match_date' => $matchDate,
                'kickoff_time' => $kickoffTime,
                'team1_id' => $data['team1_id'],
                'team2_id' => $data['team2_id'],
                'league_id' => $data['league_id'] ?? null,
                'sport' => $data['sport'] ?? SportEventType::Football,
                'status' => SportEventStatus::Pending,
                'season' => $data['season'] ?? null,
                'match_week' => $data['match_week'] ?? null,
            ]);

            foreach (MatchOption::values() as $option) {
                $event->options()->create([
                    'type' => $option,
                    'value' => null,
                ]);
            }

            return $event;
        });
    }
}
