<?php

namespace App\Enums;

use App\Traits\HasValues;

enum WithdrawalMethod: string
{
    use HasValues;

    case BankTransfer = 'bank_transfer';
    case PayPal = 'paypal';
    case Cryptocurrency = 'cryptocurrency';
}
