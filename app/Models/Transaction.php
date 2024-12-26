<?php

namespace App\Models;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class Transaction
 *
 * @property int $id The unique identifier for the transaction.
 *
 * @property int $user_id The ID of the user who made the transaction.
 *
 * @property string $reference The unique reference for the transaction.
 * @property string $amount The amount involved in the transaction.
 * @property TransactionType $type The type of transaction, either 'stake' or 'winnings'.
 * @property TransactionStatus $status The status of the transaction, either 'pending', 'completed', or 'failed'.
 * @property int $balance
 *
 * @property Carbon|null $created_at Timestamp when the transaction was created.
 * @property Carbon|null $updated_at Timestamp when the transaction was last updated.
 *
 * @property-read User $user The user who made the transaction.
 * @property-read Bet|null $bet The bet associated with the transaction (nullable).
 */
class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'type' => TransactionType::class,
            'status' => TransactionStatus::class
        ];
    }

    public function bet(): HasOne
    {
        return $this->hasOne(Bet::class);
    }

    public function winning(): HasOne
    {
        return $this->hasOne(Winning::class);
    }

    public function withdrawal(): HasOne
    {
        return $this->hasOne(Withdrawal::class);
    }

    public function deposit(): HasOne
    {
        return $this->hasOne(Deposit::class);
    }

    public function refund(): HasOne
    {
        return $this->hasOne(Refund::class);
    }
}
