<?php

namespace App\Http\Controllers;

use App\Enums\SportEventStatus;
use App\Http\Resources\ApiSportEventResource;
use App\Models\SportEvent;
use Carbon\Carbon;
use Inertia\Inertia;

class SportEventController extends Controller
{
    public function index()
    {
        $currentTime = Carbon::now()->format('H:i:s');

        $theresMatchToday = SportEvent::query()
            ->whereDay('match_date', today())
            ->whereTime('kickoff_time', '>', now()->format('H:i:s'))
            ->whereIn('status', [SportEventStatus::Pending, SportEventStatus::InProgress])
            ->exists();

        $dayFilter = $theresMatchToday ? today() : today()->addDay();
        $dayFilterIsCurrentDay = $dayFilter->isToday();

        $events = SportEvent::query()
            ->with(['team1', 'team2'])
            ->whereDay('match_date', $dayFilter)
            ->when($dayFilterIsCurrentDay, function ($query) {
                $query->whereTime('kickoff_time', '>', now()->format('H:i:s'));
            })
            ->whereIn('status', [SportEventStatus::Pending, SportEventStatus::InProgress])
            ->orderBy('match_date', 'asc')
            ->orderBy('kickoff_time', 'asc')
            ->get();

        return Inertia::render('SportEvents', [
            'events' => Inertia::defer(fn() => ApiSportEventResource::collection($events)),
        ]);
    }
}
