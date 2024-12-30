<?php

namespace App\Traits;

use App\Models\WithdrawalAccount;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasWithdrawalAccount
{
    public function withdrawalAccounts(): HasMany
    {
        return $this->hasMany(WithdrawalAccount::class);
    }
}
