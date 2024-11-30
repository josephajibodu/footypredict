<?php

namespace App\Traits;

use App\Models\Transfer;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasTransfers
{
    public function transferOut(): HasMany
    {
        return $this->hasMany(Transfer::class);
    }

    public function transferIn(): HasMany
    {
        return $this->hasMany(Transfer::class, 'recipient_id');
    }
}