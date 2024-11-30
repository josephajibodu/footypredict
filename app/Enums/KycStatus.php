<?php

namespace App\Enums;

use App\Traits\HasValues;

enum KycStatus: string
{
    use HasValues;

    case Pending = 'pending';
    case Rejected = 'rejected';
    case Completed = 'completed';
}