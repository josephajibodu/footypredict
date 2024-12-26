<?php

namespace App\Traits;

use App\Models\Bet;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasBets
{
    public function bets() : HasMany
    {
        return $this->hasMany(Bet::class);
    }
}