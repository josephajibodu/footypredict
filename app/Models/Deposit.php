<?php

namespace App\Models;

use App\Enums\DepositMethod;
use App\Traits\HasTransaction;
use Carbon\Carbon;
use Database\Factories\TransactionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Deposit
 *
 * @property int $id The unique identifier for the transaction.
 * @property string $provider_reference
 * @property DepositMethod $method
 * @property float $amount_received
 * @property float $fee
 * @property array $metadata
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Deposit extends Model
{
    use HasTransaction;

    /** @use HasFactory<TransactionFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'method' => DepositMethod::class,
            'metadata' => 'array',
        ];
    }
}
