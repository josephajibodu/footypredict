<?php

namespace App\Http\Resources;

use App\Models\BetSportEvent;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin BetSportEvent
 */
class ApiBetSportEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'selected_option' => $this->relationLoaded('selectedOption')
                ? new ApiOptionResource($this->selectedOption)
                : null,
            'outcome_option' => $this->relationLoaded('outcomeOption')
                ? new ApiOptionResource($this->outcomeOption)
                : null,
            'is_correct' => (bool) $this->is_correct,
            'sport_event' => $this->relationLoaded('sportEvent')
                ? new ApiSportEventResource($this->sportEvent)
                : null,
        ];
    }
}
