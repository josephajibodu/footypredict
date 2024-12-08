<?php

namespace App\Enums;

use App\Traits\HasValues;

enum DepositMethod: string
{
    use HasValues;

    case BankTransfer = 'bank_transfer';
    case CreditCard = 'credit_card';
    case PayPal = 'paypal';
    case Cryptocurrency = 'cryptocurrency';
}
