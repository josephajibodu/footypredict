<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $user_id
 * @property float $ngn_balance
 * @property float $usdt_balance
 * @property Carbon $created_at Timestamp when the wallet was created
 * @property Carbon $updated_at Timestamp when the wallet was last updated
 * @property-read User $user
 */
class Wallet extends Model
{
    protected $guarded = ['id'];

    /**
     * Relationships
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
