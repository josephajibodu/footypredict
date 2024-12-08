<?php

namespace App\Settings;

use DateTime;
use Spatie\LaravelSettings\Settings;

class BetSetting extends Settings
{
    public int $required_selections;

    public int $pool_size;

    public int $winning_multiplier;

    public int $min_stake;

    public int $max_stake;

    public static function group(): string
    {
        return 'bet';
    }
}