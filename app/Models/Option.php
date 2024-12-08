<?php

namespace App\Models;

use App\Enums\MatchOption;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Class Option
 *
 * @property int $id                 The unique identifier for the option.
 * @property int $sport_event_id     The ID of the associated sport event.
 * @property MatchOption $type            The type of the match option (e.g., home_win, away_win).
 * @property bool|null $value        The boolean value of the option (e.g., true for a win condition).
 *
 * @property Carbon|null $created_at Timestamp of creation.
 * @property Carbon|null $updated_at Timestamp of last update.
 *
 */
class Option extends Model
{
    protected $fillable = [
        'type', 'value'
    ];

    protected function casts(): array
    {
        return [
            'type' => MatchOption::class
        ];
    }

    public function sportEvent(): BelongsTo
    {
        return $this->belongsTo(SportEvent::class);
    }
}
