<?php

namespace App\Models;

use App\Traits\HasTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bet extends Model
{
    use HasTransaction;
}
