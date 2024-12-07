<?php

namespace App\Enums;

use App\Traits\HasValues;

enum SportEventStatus: string
{
    use HasValues;

    case Pending = 'pending';
    case Completed = 'completed';
    case Postponed = 'postponed';
    case Cancelled = 'cancelled';
}
