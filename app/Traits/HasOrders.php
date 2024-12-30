<?php

namespace App\Traits;

use App\Models\Order;
use App\Models\SellAdvert;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait HasOrders
{
    public function sellAdvert(): HasOne
    {
        return $this->hasOne(SellAdvert::class);
    }

    public function sellOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function buyOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'recipient_id');
    }
}
