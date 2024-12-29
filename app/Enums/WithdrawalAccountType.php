<?php

namespace App\Enums;

use App\Traits\HasValues;

enum WithdrawalAccountType: string
{
    use HasValues;

    case FiatBank = 'bank';
    case CryptoWalletAddress = 'crypto-wallet-address';
}
