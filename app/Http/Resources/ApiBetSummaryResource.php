<?php

namespace App\Http\Resources;

use App\Models\Bet;
use App\Models\SportEvent;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Bet
 */
class ApiBetSummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var SportEvent $sportEvents */
        $sportEvents = $this->sportEvents;

        $formattedEvents = collect($sportEvents)->map(fn (SportEvent $item, int $key) => [
            'fixture' => "{$item->team1->short_name} vs {$item->team2->short_name}",
        ]);

        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'code' => $this->code,
            'user_id' => $this->user_id,
            'stake' => $this->stake / 100,
            'multiplier_settings' => $this->multiplier_settings,
            'potential_winnings' => $this->potential_winnings / 100,
            'status' => $this->status->value,
            'short_sport_events' => $formattedEvents,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
