<?php

namespace App\Traits;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait HasTransaction
{
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}