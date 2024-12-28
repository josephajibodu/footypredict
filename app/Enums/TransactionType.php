<?php

namespace App\Enums;

use App\Traits\HasValues;

enum TransactionType: string
{
    use HasValues;

    case Bet = 'bet';
    case Winning = 'winning';
    case Withdrawal = 'withdrawal';
    case Deposit = 'deposit';
    case Refunds = 'refunds';
}