<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiBetSportEventResource;
use App\Models\Bet;
use App\Models\BetSportEvent;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class ShareBetController extends Controller
{
    public function index(Bet $bet)
    {
        /** @var Collection<BetSportEvent> $betSportEvents */
        $betSportEvents = $bet->betSportEvent->load('selectedOption', 'sportEvent.team1', 'sportEvent.team2');

        $allEventsStarted = $betSportEvents->every(function ($event) {
            return Carbon::parse($event->sportEvent->match_date)->setTimeFromTimeString($event->sportEvent->kickoff_time)->isPast();
        });

        return response()->json([
            'status' => true,
            'isAvailable' => !$allEventsStarted,
            'data' => !$allEventsStarted ? ApiBetSportEventResource::collection($betSportEvents) : null,
            'message' => $allEventsStarted ? 'This bet code is no longer valid. All matches have started.' : null,
        ]);
    }
}
