<?php

namespace App\Traits;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property-read Transaction $transaction
 */
trait HasManyTransactions
{
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
