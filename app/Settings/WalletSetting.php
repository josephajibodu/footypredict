<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class WalletSetting extends Settings
{
    public int $minimum_deposit_ngn;

    public int $minimum_deposit_usdt;

    public static function group(): string
    {
        return 'wallet';
    }
}