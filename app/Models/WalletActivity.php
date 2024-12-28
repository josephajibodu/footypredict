<?php

namespace App\Models;

use App\Enums\Currency;
use Illuminate\Database\Eloquent\Model;

class WalletActivity extends Model
{
    protected function casts(): array
    {
        return [
            'currency' => Currency::class
        ];
    }
}
