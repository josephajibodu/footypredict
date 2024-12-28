<?php

namespace App\Enums;

use App\Traits\HasValues;

enum LogChannel: string
{
    use HasValues;

    case Default = 'default';
    case Deposits = 'deposits';
    case Withdrawals = 'withdrawals';
    case Bet = 'bet';
}