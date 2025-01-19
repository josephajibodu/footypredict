<?php

namespace App\Models;

use App\Traits\HasTransaction;
use Carbon\Carbon;
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
}
