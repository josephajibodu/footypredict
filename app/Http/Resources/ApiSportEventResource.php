<?php

namespace App\Http\Resources;

use App\Models\SportEvent;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin SportEvent
 */
class ApiSportEventResource extends JsonResource
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
            'match_date' => $this->match_date,
            'kickoff_time' => $this->kickoff_time,
            'team1_id' => $this->team1_id,
            'team2_id' => $this->team2_id,
            'league_id' => $this->league_id,
            'sport' => $this->sport->value,
            'status' => $this->status->value,
            'team1_score' => $this->team1_score,
            'team2_score' => $this->team2_score,
            'season' => $this->season,
            'match_week' => $this->match_week,
            'home_team' => ApiTeamResource::make($this->whenLoaded('team1')),
            'away_team' => ApiTeamResource::make($this->whenLoaded('team2')),
            'options' => ApiOptionResource::collection($this->whenLoaded('options')),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
