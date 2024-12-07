<?php

namespace App\Enums;

use App\Traits\HasValues;
use Filament\Support\Contracts\HasLabel;

enum SportEventStatus: string implements HasLabel
{
    use HasValues;

    case Pending = 'pending';
    case Completed = 'completed';
    case Postponed = 'postponed';
    case Cancelled = 'cancelled';


    public function getLabel(): ?string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::Completed => 'Completed',
            self::Postponed => 'Postponed',
            self::Cancelled => 'Cancelled',
        };
    }
}
