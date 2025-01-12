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
            'transaction_id' => $this->transaction_id,
            'reference' => $this->reference,
            'code' => $this->code,
            'user_id' => $this->user_id,
            'is_flexed' => $this->is_flexed,
            'stake' => $this->stake / 100,
            'multiplier_settings' => $this->multiplier_settings,
            'potential_winnings' => $this->potential_winnings / 100,
            'status' => $this->status->value,
            'transaction' => ApiTransactionResource::make($this->whenLoaded('transaction')),
            'sport_events' => ApiSportEventResource::collection($this->whenLoaded('sportEvents')),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
