<?php

namespace App\Enums;

enum BetStatus: string
{
    case Pending = 'pending';
    case Lost = 'lost';
    case Won = 'won';
    case Voided = 'voided';
}
