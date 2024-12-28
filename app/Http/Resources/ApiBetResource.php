<?php

namespace App\Http\Resources;

use App\Models\Bet;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Bet
 */
class ApiBetResource extends JsonResource
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
            'user_id' => $this->user_id,
            'stake' => $this->stake / 100,
            'multiplier' => $this->multiplier,
            'potential_winnings' => $this->potential_winnings / 100,
            'status' => $this->status->value,
            'transaction' => ApiTransactionResource::make($this->whenLoaded('transaction')),
            'sport_events' => ApiSportEventResource::collection($this->whenLoaded('sportEvents')),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
