<?php

namespace App\Enums;

use App\Traits\HasValues;

enum LogChannel: string
{
    use HasValues;

    case Deposits = 'deposits';
    case Withdrawals = 'withdrawals';
    case Bet = 'bet';
    case SportEvent = 'sports-event';
    case BetProcessing = 'bet-processing';
    case ExternalAPI = 'external-api';
}
