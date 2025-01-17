<?php

namespace App\Models;

use App\Enums\MatchOption;
use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * Class SportEvent
 *
 * @property int $id The unique identifier for the sport event.
 * @property Carbon $match_date The date of the match.
 * @property string $kickoff_time The kickoff time of the match.
 * @property int $team1_id The ID of the first team.
 * @property int $team2_id The ID of the second team.
 * @property int|null $league_id The ID of the league the match belongs to (nullable).
 * @property SportEventType $sport The type of sport (e.g., football, basketball).
 * @property SportEventStatus $status The status of the event (e.g., pending, completed).
 * @property int|null $team1_score The score of the first team (nullable).
 * @property int|null $team2_score The score of the second team (nullable).
 * @property string|null $season The season the event belongs to (nullable).
 * @property int|null $match_week The match week number (nullable).
 * @property-read Team $team1
 * @property-read Team $team2
 * @property-read Collection<MatchOption> $options Available match options
 * @property Carbon|null $created_at Timestamp of creation.
 * @property Carbon|null $updated_at Timestamp of last update.
 */
class SportEvent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'match_date',
        'kickoff_time',
        'team1_id',
        'team2_id',
        'league_id',
        'sport',
        'status',
        'team1_score',
        'team2_score',
        'season',
        'match_week',
    ];

    protected function casts(): array
    {
        return [
            'match_date' => 'date',
            'team1_score' => 'integer',
            'team2_score' => 'integer',
            'sport' => SportEventType::class,
            'status' => SportEventStatus::class,
        ];
    }

    public function bets(): BelongsToMany
    {
        return $this->belongsToMany(Bet::class)
            ->withPivot('selected_option_id', 'outcome_option_id', 'is_correct');
    }

    public function team1(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function team2(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function league(): BelongsTo
    {
        return $this->belongsTo(League::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(Option::class);
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
