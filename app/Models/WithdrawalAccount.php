<?php

namespace App\Models;

use App\Enums\Currency;
use App\Enums\WithdrawalAccountType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string|int $user_id
 * @property string $account_name
 * @property string $bank_name
 * @property string $account_number
 * @property string $bank_code
 * @property string $payment_provider
 * @property WithdrawalAccountType $type
 * @property string $memo_tag
 * @property string $withdrawal_address
 * @property bool $is_default
 * @property array $metadata
 * @property Currency $currency
 *
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read User $user
 */
class WithdrawalAccount extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'type' => WithdrawalAccountType::class,
            'metadata' => 'array',
            'is_default' => 'boolean',
            'currency' => Currency::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
