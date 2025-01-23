<?php

namespace App\Models;

use App\Traits\HasTransaction;
use Carbon\Carbon;
use Database\Factories\TransactionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Winning
 *
 * @property int $id The unique identifier for the transaction.
 *
 * @property int $transaction_id
 * @property int $bet_id
 *
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Transaction $transaction
 * @property-read Bet $bet
 */
class Winning extends Model
{
    use HasTransaction;

    /** @use HasFactory<TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'bet_id',
    ];
}
