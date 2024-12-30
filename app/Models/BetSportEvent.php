<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class BetSportEvent
 *
 * @property int $id The unique identifier for the bet-sport-event record.
 * @property int $bet_id The ID of the associated bet.
 * @property int $sport_event_id The ID of the associated sport event.
 * @property int $selected_option_id The ID of the option selected by the user.
 * @property int $outcome_option_id The ID of the actual outcome option.
 * @property bool|null $is_correct Whether the selected option is correct (null if undecided).
 * @property Carbon|null $created_at Timestamp when the record was created.
 * @property Carbon|null $updated_at Timestamp when the record was last updated.
 * @property-read Bet $bet The bet associated with this record.
 * @property-read SportEvent $sportEvent The sport event associated with this record.
 * @property-read Option $selectedOption The selected option for the bet.
 * @property-read Option $outcomeOption The outcome option for the bet.
 */
class BetSportEvent extends Model
{
    protected $fillable = [
        'bet_id',
        'sport_event_id',
        'selected_option_id',
        'outcome_option_id',
        'is_correct',
    ];

    /**
     * Relationship with the bet.
     */
    public function bet(): BelongsTo
    {
        return $this->belongsTo(Bet::class);
    }

    /**
     * Relationship with the sport event.
     */
    public function sportEvent(): BelongsTo
    {
        return $this->belongsTo(SportEvent::class);
    }

    /**
     * Relationship with the selected option.
     */
    public function selectedOption(): BelongsTo
    {
        return $this->belongsTo(Option::class, 'selected_option_id');
    }

    /**
     * Relationship with the outcome option.
     */
    public function outcomeOption(): BelongsTo
    {
        return $this->belongsTo(Option::class, 'outcome_option_id');
    }
}
