<?php

namespace App\Models;

use App\Enums\BetStatus;
use App\Enums\Currency;
use App\Traits\HasTransaction;
use Carbon\Carbon;
use Database\Factories\TransactionFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Bet
 *
 * @property int $id The unique identifier for the bet.
 * @property string $reference
 * @property int $code
 * @property int $user_id
 * @property int $transaction_id The ID of the transaction associated with the bet.
 * @property int $stake The amount staked on the bet.
 * @property bool $is_flexed
 * @property array $multiplier_settings
 * @property int $potential_winnings The calculated potential winnings.
 * @property BetStatus $status The status of the bet (e.g., 'pending', 'won', 'lost').
 * @property Currency $currency
 * @property Carbon|null $created_at Timestamp when the bet was created.
 * @property Carbon|null $updated_at Timestamp when the bet was last updated.
 * @property-read User $user
 * @property-read Transaction $transaction The transaction associated with the bet.
 * @property-read Collection<SportEvent> $sportEvents The sport events linked to the bet.
 */
class Bet extends Model
{
    use HasTransaction;

    /** @use HasFactory<TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'code',
        'reference',
        'transaction_id',
        'stake',
        'multiplier_settings',
        'potential_winnings',
        'status',
        'is_flexed',
        'currency',
    ];

    protected function casts(): array
    {
        return [
            'status' => BetStatus::class,
            'multiplier_settings' => 'array',
            'is_flexed' => 'boolean',
            'currency' => Currency::class,
        ];
    }

    /**
     * Relationship with sport events.
     */
    public function sportEvents(): BelongsToMany
    {
        return $this->belongsToMany(SportEvent::class)
            ->withPivot('selected_option_id', 'outcome_option_id', 'is_correct');
    }

    /**
     * Relationship with transaction.
     */
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    /**
     * Relationship with transaction.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with betSportEvent(the pivot table between bet and sport-event).
     *
     * This relationship is needed for easy access to the selected match outcome and the actual outcome
     */
    public function betSportEvent(): HasMany
    {
        return $this->hasMany(BetSportEvent::class);
    }
}
