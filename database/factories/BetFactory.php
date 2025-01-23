<?php

namespace Database\Factories;

use App\Enums\BetStatus;
use App\Enums\Currency;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bet>
 */
class BetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'reference' => Str::uuid(),
            'code' => $this->faker->randomNumber(5),
            'transaction_id' => Transaction::factory(),
            'stake' => $stake = $this->faker->randomFloat(2, 1000_00, 5000_00),
            'multiplier_settings' => [
                'selection' => 2,
                'allow_flex' => false,
                'main' => 3,
                'flex_0' => null,
                'flex_1' => null,
                'flex_2' => null,
            ],
            'potential_winnings' => $stake * 3,
            'status' => BetStatus::Pending,
            'is_flexed' => $this->faker->boolean(),
            'currency' => Currency::NGN,
        ];
    }
}
