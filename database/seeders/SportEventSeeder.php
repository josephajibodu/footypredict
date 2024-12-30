<?php

namespace Database\Seeders;

use App\Enums\MatchOption;
use App\Models\Option;
use App\Models\SportEvent;
use App\Models\Team;
use Illuminate\Database\Seeder;

class SportEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teamIds = Team::query()->pluck('id')->toArray();

        shuffle($teamIds);

        for ($i = 0; $i < 16; $i += 2) {
            // Skip if we don't have enough teams
            if (! isset($teamIds[$i]) || ! isset($teamIds[$i + 1])) {
                break;
            }

            // Create the sport event
            $sportEvent = SportEvent::factory()->create([
                'team1_id' => $teamIds[$i],
                'team2_id' => $teamIds[$i + 1],
                'kickoff_time' => sprintf('%02d:00:00', rand(12, 21)),
            ]);

            // Create the three standard options for each match
            $options = [
                MatchOption::HOME_WIN,
                MatchOption::DRAW,
                MatchOption::AWAY_WIN,
            ];

            foreach ($options as $option) {
                Option::query()->create([
                    'sport_event_id' => $sportEvent->id,
                    'type' => $option,
                    'value' => null,
                ]);
            }
        }
    }
}
