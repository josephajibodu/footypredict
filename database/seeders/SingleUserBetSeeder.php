<?php

namespace Database\Seeders;

use App\Actions\Bets\PlaceBet;
use App\Models\SportEvent;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SingleUserBetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::query()->where('email', 'joseph@footypredict.test')->first();

        if (! $user) {
            $this->command->error('User with the specified email not found.');
            return;
        }

        $user->credit(50_000, 'Test runs');

        $placeBet = app(PlaceBet::class);

        $sportEventCount = SportEvent::query()->count();
        if ($sportEventCount < 6) {
            $this->command->error('Not enough sport events in the database to seed bets.');
            return;
        }

        for ($i = 0; $i < 50; $i++) {
            $events = SportEvent::query()
                ->inRandomOrder()
                ->take(rand(2, 3))
                ->get()
                ->map(function ($event) {
                    return [
                        'event_id' => $event->id,
                        'bet_option' => ['home_win', 'draw', 'away_win'][array_rand(['home_win', 'draw', 'away_win'])],
                    ];
                })->toArray();

            $amount = rand(100, 500);
            $isFlexed = (bool) rand(0, 1);

            $placeBet($user, $amount, $events, $isFlexed);
        }

        $this->command->info('Bets successfully created for the user.');
    }
}
