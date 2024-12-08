<?php

namespace App\Models;

use App\Enums\DepositMethod;
use App\Enums\DepositStatus;
use App\Traits\HasTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Refund
 *
 * @property int $id The unique identifier for the transaction.
 *
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Transaction $transaction
 */
class Refund extends Model
{
    use HasTransaction;
}
