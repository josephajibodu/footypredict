<?php

namespace App\Models;

use App\Enums\WithdrawalMethod;
use App\Traits\HasTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Withdrawal
 *
 * @property int $id The unique identifier for the transaction.
 *
 * @property WithdrawalMethod $method
 * @property string $withdrawal_address
 *
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Transaction $transaction
 */
class Withdrawal extends Model
{
    use HasTransaction;

    protected function casts(): array
    {
        return [
            'method' => WithdrawalMethod::class
        ];
    }
}
