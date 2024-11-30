<?php

namespace App\Traits;

use App\Models\Wallet;
use App\Models\WalletActivity;
use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

trait HasWallet
{
    /**
     * The base unit for wallet balance
     */
    public const BALANCE_UNIT = 100;

    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    public function walletActivities(): HasMany
    {
        return $this->hasMany(WalletActivity::class, 'user_id');
    }

    /**
     * Get the user's balance in Naira.
     */
    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->wallet ? $this->wallet->balance / static::BALANCE_UNIT : 0,
        );
    }

    /**
     * Credit the user's wallet and record the activity.
     * Amount should be in NAIRA(not Kobo)
     *
     * @throws Exception
     */
    public function credit(int $amount, ?string $reason = null): WalletActivity
    {
        return $this->createWalletActivity($amount, $reason);
    }

    /**
     * Debit the user's wallet and record the activity.
     * Amount should be in NAIRA(not Kobo)
     *
     * @throws Exception
     */
    public function debit(int $amount, ?string $reason = null): WalletActivity
    {
        if (! $this->hasSufficientBalance($amount)) {
            throw new Exception('Insufficient balance.');
        }

        return $this->createWalletActivity(-1 * abs($amount), $reason);
    }

    /**
     * Check if the user's wallet has sufficient balance.
     * Amount should be in NAIRA(not Kobo)
     *
     */
    public function hasSufficientBalance(float $amount): bool
    {
        return $this->wallet && $this->wallet->balance >= $amount * static::BALANCE_UNIT;
    }

    /**
     * Reset the user's wallet activities.
     */
    public function resetWalletActivities(bool $clearBalance = true): void
    {
        $this->walletActivities()->delete();

        // Optionally clear the wallet balance
        if ($clearBalance && $this->wallet) {
            $this->wallet->balance = 0;
            $this->wallet->save();
        }
    }

    /**
     * Create an account activity record and update the wallet balance.
     *
     * @throws Exception
     */
    protected function createWalletActivity(int $amount, ?string $reason = null): WalletActivity
    {
        if (! $this->wallet) {
            throw new Exception('Wallet not found.');
        }

        return DB::transaction(function () use ($amount, $reason) {

            $formattedAmount = $amount * static::BALANCE_UNIT;

            $this->wallet->increment('balance', $formattedAmount);

            return $this->walletActivities()->create([
                'amount' => $formattedAmount,
                'reason' => $reason,
            ]);

        });
    }
}