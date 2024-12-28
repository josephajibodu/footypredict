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
            'id' => $this->id,
            'bet_id' => $this->bet_id,
            'sport_event_id' => $this->sport_event_id,
            'selected_option' => ApiOptionResource::make($this->whenLoaded('selectedOption')),
            'outcome_option' => ApiOptionResource::make($this->whenLoaded('outcomeOption')),
            'is_correct' => $this->is_correct,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
