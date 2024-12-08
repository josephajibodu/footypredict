<?php

namespace App\Enums;

use App\Traits\HasValues;

enum MatchOption: string
{
    use HasValues;

    case HOME_WIN = 'home_win';
    case AWAY_WIN = 'away_win';
    case DRAW = 'draw';

    /**
     * Get a human-readable label for the result type.
     */
    public function label(): string
    {
        return match ($this) {
            self::HOME_WIN => 'Home Win',
            self::AWAY_WIN => 'Away Win',
            self::DRAW => 'Draw',
        };
    }

    /**
     * Get short code for the result type.
     */
    public function shortCode(): string
    {
        return match ($this) {
            self::HOME_WIN => '1',
            self::AWAY_WIN => '2',
            self::DRAW => 'X',
        };
    }
}
