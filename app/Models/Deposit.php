<?php

namespace App\Models;

use App\Enums\DepositMethod;
use App\Enums\DepositStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Traits\HasTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Deposit
 *
 * @property int $id The unique identifier for the transaction.
 *
 * @property DepositMethod $method
 * @property DepositStatus $status
 *
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Transaction $transaction
 */
class Deposit extends Model
{
    use HasTransaction;

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'method' => DepositMethod::class,
            'status' => DepositStatus::class,
            'metadata' => 'array',
        ];
    }
}
