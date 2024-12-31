<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class BetSetting extends Settings
{
    public int $min_selection;

    public int $max_selection;

    public array $selection_config;

    public int $pool_size;

    public int $winning_multiplier;

    public int $min_stake;

    public int $max_stake;

    public static function group(): string
    {
        return 'bet';
    }
}
