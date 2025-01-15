<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;

enum BetStatus: string implements HasColor
{
    case Pending = 'pending';
    case Lost = 'lost';
    case Won = 'won';
    case Voided = 'voided';

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Won => 'success',
            self::Lost, self::Voided => 'danger',
            self::Pending => 'warning',
        };
    }
}
