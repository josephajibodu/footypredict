<?php

namespace Database\Seeders;

use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use App\Models\SportEvent;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SportEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matchDate = Carbon::today(); // All matches will be on this date

        $matches = [
            [
                'match_date' => $matchDate,
                'kickoff_time' => '12:00:00',
                'team1_id' => 1, // Arsenal
                'team2_id' => 2, // Manchester United
                'league_id' => 1,
                'sport' => SportEventType::Football,
                'status' => SportEventStatus::Pending,
                'team1_score' => null,
                'team2_score' => null,
                'season' => '2023/2024',
                'match_week' => 17,
            ],
            [
                'match_date' => $matchDate,
                'kickoff_time' => '14:00:00',
                'team1_id' => 3,
                'team2_id' => 4,
                'league_id' => 1,
                'sport' => SportEventType::Football,
                'status' => SportEventStatus::Pending,
                'team1_score' => null,
                'team2_score' => null,
                'season' => '2023/2024',
                'match_week' => 18,
            ],
            [
                'match_date' => $matchDate,
                'kickoff_time' => '16:00:00',
                'team1_id' => 5,
                'team2_id' => 6,
                'league_id' => 1,
                'sport' => SportEventType::Football,
                'status' => SportEventStatus::Pending,
                'team1_score' => null,
                'team2_score' => null,
                'season' => '2023/2024',
                'match_week' => 16,
            ],
            [
                'match_date' => $matchDate,
                'kickoff_time' => '18:00:00',
                'team1_id' => 7,
                'team2_id' => 8,
                'league_id' => 1,
                'sport' => SportEventType::Football,
                'status' => SportEventStatus::Pending,
                'team1_score' => null,
                'team2_score' => null,
                'season' => '2023/2024',
                'match_week' => 15,
            ],
        ];

        foreach ($matches as $match) {
            $match = SportEvent::query()->create($match);

            // Create 3 options for each match (1, X, 2)
            $options = [
                [
                    'type' => MatchOption::HOME_WIN,
                    'value' => null,
                ],
                [
                    'type' => MatchOption::DRAW,
                    'value' => null,
                ],
                [
                    'type' => MatchOption::AWAY_WIN,
                    'value' => null,
                ]
            ];

            foreach ($options as $optionData) {
                $match->options()->create($optionData);
            }
        }
    }
}
