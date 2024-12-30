<?php

namespace App\Models;

use App\Enums\WithdrawalAccountType;
use App\Traits\HasTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Withdrawal
 *
 * @property int $id The unique identifier for the transaction.
 * @property string|int $transaction_id
 * @property WithdrawalAccountType $type
 * @property string|null $withdrawal_address
 * @property string|null $account_name
 * @property string|null $bank_name
 * @property string|null $account_number
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Transaction $transaction
 */
class Withdrawal extends Model
{
    use HasTransaction;

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'type' => WithdrawalAccountType::class,
        ];
    }
}
