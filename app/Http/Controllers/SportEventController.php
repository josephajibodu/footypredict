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

        $events = SportEvent::query()
            ->with(['team1', 'team2'])
            ->whereDay('match_date', today())
//            ->where(function ($query) {
//                $query->whereRaw("CONCAT(match_date, ' ', kickoff_time) > ?", [now()->format('Y-m-d H:i:s')]);
//            })
            ->whereIn('status', [SportEventStatus::Pending, SportEventStatus::InProgress])
            ->orderBy('match_date', 'asc')
            ->orderBy('kickoff_time', 'asc')
            ->get();

        return Inertia::render('SportEvents', [
            'events' => Inertia::defer(fn() => ApiSportEventResource::collection($events)),
        ]);
    }
}
