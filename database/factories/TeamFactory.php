<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'short_name' => $this->faker->optional()->lexify('???'),
            'short_code' => $this->faker->optional()->lexify('??'),
            'logo_url' => $this->faker->optional()->imageUrl(100, 100, 'sports', true, 'logo'),
            'country' => $this->faker->country,
        ];
    }
}
