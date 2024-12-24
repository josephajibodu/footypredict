<?php

namespace Database\Factories;

use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use App\Models\League;
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
            'sport' => SportEventType::Football,
            'status' => SportEventStatus::Pending,
            'season' => '2023/2024',
            'match_week' => fake()->numberBetween(1, 38),
            'league_id' => League::query()->first(),
        ];
    }
}
