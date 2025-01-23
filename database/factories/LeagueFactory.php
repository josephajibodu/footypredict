<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\League>
 */
class LeagueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word . ' League',
            'short_code' => $this->faker->optional()->lexify('???'),
            'logo_url' => $this->faker->imageUrl(100, 100, 'sports', true, 'league logo'),
            'country' => $this->faker->country,
        ];
    }
}
