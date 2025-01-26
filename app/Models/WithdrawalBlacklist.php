<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property $id
 * @property $user_id
 * @property $reason
 * @property $blacklisted_by
 *
 * @property-read User $user
 * @property-read User $blacklistedBy
 */
class WithdrawalBlacklist extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'reason', 'blacklisted_by'];

    /**
     * Relationship to the user being blacklisted.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relationship to the user/admin who initiated the blacklist.
     */
    public function blacklistedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'blacklisted_by');
    }
}
