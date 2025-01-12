<?php

namespace Database\Seeders;

use App\Actions\Bets\PlaceBet;
use App\Models\SportEvent;
use App\Models\User;
use Illuminate\Database\Seeder;

class BetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();

        $placeBet = app(PlaceBet::class);

        foreach ($users as $user) {
            $events = SportEvent::query()->inRandomOrder()->take(rand(2,3))->get()->map(function ($event) {
                return [
                    'event_id' => $event->id,
                    'bet_option' => ['home_win', 'draw', 'away_win'][array_rand(['home_win', 'draw', 'away_win'])],
                ];
            })->toArray();

            $amount = rand(100, 500);
            $isFlexed = (bool) rand(0, 1);

            $placeBet($user, $amount, $events, $isFlexed);
        }
    }
}
