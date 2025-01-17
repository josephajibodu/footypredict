<?php

namespace App\Traits;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read Transaction $transaction
 */
trait HasTransaction
{
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}
