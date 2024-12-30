<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiSportEventResource;
use App\Models\SportEvent;
use Inertia\Inertia;

class SportEventController extends Controller
{
    public function index()
    {
        $events = SportEvent::query()
            ->with(['team1', 'team2'])
            ->whereDay('match_date', today())->get();

        return Inertia::render('Events', [
            'events' => ApiSportEventResource::collection($events),
        ]);
    }
}
