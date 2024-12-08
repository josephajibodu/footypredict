<?php

namespace App\Enums;

use App\Traits\HasValues;

enum TransactionStatus: string
{
    use HasValues;

    case Pending = 'pending';
    case Completed = 'completed';
    case Failed = 'failed';
    case Cancelled = 'cancelled';
}
