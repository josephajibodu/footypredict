<?php

namespace App\Enums;

use App\Traits\HasValues;
use Filament\Support\Contracts\HasLabel;

enum SportEventType: string implements HasLabel
{
    use HasValues;

    case Football = 'football';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Football => 'Football'
        };
    }
}
