<?php

namespace App\Enums;

use App\Traits\HasValues;
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum SportEventStatus: string implements HasLabel, HasColor
{
    use HasValues;

    case Pending = 'pending';
    case InProgress = 'progressing';
    case Completed = 'completed';
    case Postponed = 'postponed';
    case Cancelled = 'cancelled';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::InProgress => 'In Progress',
            self::Completed => 'Completed',
            self::Postponed => 'Postponed',
            self::Cancelled => 'Cancelled',
        };
    }

    public function getColor(): ?string
    {
        return match ($this) {
            self::Pending => 'warning',
            self::InProgress => 'primary',
            self::Completed => 'success',
            self::Postponed => 'gray',
            self::Cancelled => 'danger',
        };
    }
}
