<?php

namespace App\Models;

use App\Enums\Currency;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property string $reason
 * @property int $amount
 *
 * @property Carbon $created_at Timestamp when the activity was created
 * @property Carbon $updated_at Timestamp when the activity was last updated
 *
 * @property-read User $user
 */
class WalletActivity extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'currency' => Currency::class
        ];
    }

    /**
     * Relationships
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
