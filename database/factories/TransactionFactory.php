<?php

namespace Database\Factories;

use App\Enums\Currency;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Bet;
use App\Models\Deposit;
use App\Models\Refund;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Winning;
use App\Models\Withdrawal;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
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
            'description' => $this->faker->sentence(),
            'reference' => Str::uuid(),
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'type' => TransactionType::Bet,
            'status' => TransactionStatus::Completed,
            'balance' => 0,
            'currency' => Currency::NGN,
        ];
    }

    /**
     * Indicate that the transaction is related to a bet.
     *
     * @return TransactionFactory
     */
    public function withBet(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'bet_id' => Bet::factory(),
            ];
        });
    }

    /**
     * Indicate that the transaction is related to a winning.
     *
     * @return TransactionFactory
     */
    public function withWinning(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'winning_id' => Winning::factory(),
            ];
        });
    }

    /**
     * Indicate that the transaction is related to a withdrawal.
     *
     * @return TransactionFactory
     */
    public function withWithdrawal(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'withdrawal_id' => Withdrawal::factory(),
            ];
        });
    }

    /**
     * Indicate that the transaction is related to a deposit.
     *
     * @return TransactionFactory
     */
    public function withDeposit(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'deposit_id' => Deposit::factory(),
            ];
        });
    }

    /**
     * Indicate that the transaction is related to a refund.
     *
     * @return TransactionFactory
     */
    public function withRefund(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'refund_id' => Refund::factory(),
            ];
        });
    }
}
