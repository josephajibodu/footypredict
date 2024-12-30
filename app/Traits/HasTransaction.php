<?php

namespace App\Traits;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasTransaction
{
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}
