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
        return parent::toArray($request);
        return [
            'selected_option' => ApiOptionResource::make($this->whenLoaded('selectedOption')),
            'outcome_option' => ApiOptionResource::make($this->whenLoaded('outcomeOption')),
            'is_correct' => $this->is_correct,
        ];
    }
}
