<?php

namespace Database\Factories;

use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use App\Models\League;
use App\Models\SportEvent;
use App\Models\Team;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SportEvent>
 */
class SportEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'match_date' => now()->toDateString(),
            'kickoff_time' => fake()->time('H:i:00'),
            'team1_id' => Team::query()->inRandomOrder()->first(),
            'team2_id' => Team::query()->inRandomOrder()->first(),
            'sport' => SportEventType::Football,
            'status' => SportEventStatus::Pending,
            'season' => '2023/2024',
            'match_week' => fake()->numberBetween(1, 38),
            'league_id' => League::query()->first(),
        ];
    }

    public function configure(): SportEventFactory
    {
        return $this->afterCreating(function (SportEvent $sportEvent) {
            foreach (MatchOption::values() as $option) {
                $sportEvent->options()->create([
                    'type' => $option,
                    'value' => null,
                ]);
            }
        });
    }

    public function withScoresAndStatus(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'team1_score' => $this->faker->numberBetween(0, 10),
                'team2_score' => $this->faker->numberBetween(0, 10),
                'status' => SportEventStatus::Completed,
            ];
        });
    }

    public function forToday(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'match_date' => now()->format('Y-m-d'),
                'kickoff_time' => now()->addHours(rand(1,8))->format('H:i:s'),
            ];
        });
    }
}
