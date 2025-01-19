<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiSportEventResource;
use App\Models\SportEvent;
use Carbon\Carbon;
use Inertia\Inertia;

class SportEventController extends Controller
{
    public function index()
    {
        $currentTime = Carbon::now()->format('H:i:s');

        $events = SportEvent::query()
            ->with(['team1', 'team2'])
            ->whereDay('match_date', today())
            ->whereTime('kickoff_time', '>', $currentTime)
            ->get();

        return Inertia::render('SportEvents', [
            'events' => Inertia::defer(fn() => ApiSportEventResource::collection($events)),
        ]);
    }
}
