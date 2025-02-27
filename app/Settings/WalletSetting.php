<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class WalletSetting extends Settings
{
    public int $minimum_deposit_ngn;

    public int $minimum_deposit_usdt;

    public int $minimum_withdrawal_ngn;

    public int $minimum_withdrawal_usdt;

    public int $maximum_deposit_ngn;

    public int $maximum_deposit_usdt;

    public int $maximum_withdrawal_ngn;

    public int $maximum_withdrawal_usdt;

    public static function group(): string
    {
        return 'wallet';
    }
}
