<?php

namespace App\Traits;

use App\Enums\Currency;
use App\Models\Wallet;
use App\Models\WalletActivity;
use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

/**
 * Trait HasWallet
 *
 * Provides wallet management functionalities for models using this trait.
 *
 * @property-read Wallet $wallet
 * @property-read WalletActivity[] $walletActivities
 * @property-read float $balance
 */
trait HasWallet
{
    /**
     * The base unit for wallet balance calculations.
     */
    public const BALANCE_UNIT = 100;

    /**
     * Define the one-to-one relationship with the Wallet model.
     */
    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    /**
     * Define the one-to-many relationship with the WalletActivity model.
     */
    public function walletActivities(): HasMany
    {
        return $this->hasMany(WalletActivity::class, 'user_id');
    }

    /**
     * Get the user's balance in the specified currency.
     */
    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->wallet
                ? $this->getBalanceInCurrency($this->currency) / static::BALANCE_UNIT
                : 0
        );
    }

    /**
     * Credit the user's wallet and record the activity.
     * The amount should be provided in the primary currency unit
     * (e.g., Naira instead of Kobo, USD instead of cents).
     *
     * @throws Exception
     */
    public function credit(float $amount, ?string $reason = null): WalletActivity
    {
        return $this->createWalletActivity(abs($amount), $reason);
    }

    /**
     * Debit the user's wallet and record the activity.
     * The amount should be provided in the primary currency unit
     * (e.g., Naira instead of Kobo, USD instead of cents).
     *
     * @throws Exception
     */
    public function debit(float $amount, ?string $reason = null): WalletActivity
    {
        if (! $this->hasSufficientBalance($amount)) {
            throw new Exception('Insufficient balance.');
        }

        return $this->createWalletActivity(-abs($amount), $reason);
    }

    /**
     * Check if the user's wallet has sufficient balance.
     * Amount should be in Naira (not Kobo).
     *
     * @throws Exception
     */
    public function hasSufficientBalance(float $amount): bool
    {
        return $this->wallet
            && $this->getBalanceInCurrency($this->currency) >= $amount * static::BALANCE_UNIT;
    }

    /**
     * Create a wallet activity record and update the wallet balance.
     *
     * @throws Exception
     */
    protected function createWalletActivity(float $amount, ?string $reason = null): WalletActivity
    {
        if (! $this->wallet) {
            throw new Exception('Wallet not found.');
        }

        return DB::transaction(function () use ($amount, $reason) {
            $this->updateWalletBalance($amount);

            return $this->walletActivities()->create([
                'amount' => $amount * static::BALANCE_UNIT,
                'reason' => $reason,
                'currency' => $this->currency,
            ]);
        });
    }

    /**
     * Update the wallet's balance in the specified currency.
     *
     * @throws Exception
     */
    protected function updateWalletBalance(float $amount): void
    {
        $field = match ($this->currency) {
            Currency::NGN => 'ngn_balance',
            Currency::USDT => 'usdt_balance',
            default => throw new Exception('Wallet currency is invalid.'),
        };

        $this->wallet->increment($field, $amount * static::BALANCE_UNIT);
    }

    /**
     * Get the user's balance in the specified currency.
     *
     * @throws Exception
     */
    protected function getBalanceInCurrency(Currency $currency): int
    {
        return match ($currency) {
            Currency::NGN => $this->wallet->ngn_balance,
            Currency::USDT => $this->wallet->usdt_balance,
            default => throw new Exception('Wallet currency is invalid.'),
        };
    }
}
