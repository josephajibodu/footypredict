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
        // Fetch the specific user
        $user = User::query()->where('email', 'joseph@footypredict.test')->first();

        if (! $user) {
            $this->command->error('User with the specified email not found.');
            return;
        }

        // Credit the user account
        $user->credit(5_000, 'Test runs');

        // Resolve the PlaceBet action
        $placeBet = app(PlaceBet::class);

        // Check if there are enough sport events in the database
        $sportEventCount = SportEvent::query()->count();
        if ($sportEventCount < 6) {
            $this->command->error('Not enough sport events in the database to seed bets.');
            return;
        }

        // Create random bets for the user
        for ($i = 0; $i < 5; $i++) { // Generate 5 random bets
            $events = SportEvent::query()
                ->inRandomOrder()
                ->take(rand(2, 6)) // Randomly select 2 to 6 events
                ->get()
                ->map(function ($event) {
                    return [
                        'event_id' => $event->id,
                        'bet_option' => ['home_win', 'draw', 'away_win'][array_rand(['home_win', 'draw', 'away_win'])],
                    ];
                })->toArray();

            $amount = rand(100, 500); // Random bet amount
            $isFlexed = (bool) rand(0, 1); // Random boolean for flexed bet

            // Place the bet
            $placeBet($user, $amount, $events, $isFlexed);
        }

        $this->command->info('Bets successfully created for the user.');
    }
}
