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
            if (! isset($teamIds[$i]) || ! isset($teamIds[$i + 1])) {
                break;
            }

            $today = now()->addHours(rand(36,40));
            $sportEvent = SportEvent::factory()->create([
                'match_date' => $today->format('Y-m-d'),
                'team1_id' => $teamIds[$i],
                'team2_id' => $teamIds[$i + 1],
                'kickoff_time' => $today->format('H:i:s'),
            ]);

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
