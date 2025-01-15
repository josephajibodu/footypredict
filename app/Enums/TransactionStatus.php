<?php

namespace App\Enums;

use App\Traits\HasValues;
use Filament\Support\Contracts\HasColor;

enum TransactionStatus: string implements HasColor
{
    use HasValues;

    case Pending = 'pending';
    case Completed = 'completed';
    case Failed = 'failed';
    case Cancelled = 'cancelled';

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Completed => 'success',
            self::Cancelled, self::Failed => 'danger',
            self::Pending => 'warning',
        };
    }
}
