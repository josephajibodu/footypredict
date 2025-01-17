<?php

namespace App\Http\Controllers;

use App\Actions\Bets\PlaceBet;
use App\Http\Resources\ApiBetResource;
use App\Http\Resources\ApiBetSummaryResource;
use App\Models\Bet;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BetController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $bets = $user->bets()->latest()->with(['sportEvents'])->get();

        return Inertia::render('BetHistory', [
            'bets' => Inertia::defer(function () use ($bets) {
                sleep(4);
                return ApiBetSummaryResource::collection($bets);
            }),
        ]);
    }

    public function show(Bet $bet)
    {
        $bet->load(['sportEvents.team1', 'sportEvents.team2', 'transaction']);

        return Inertia::render('BetShow', [
            'bet' => ApiBetResource::make($bet),
        ]);
    }

    public function store(Request $request, PlaceBet $placeBet)
    {
        try {
            $data = request()->validate([
                'amount' => ['required', 'numeric', 'min:1'],
                'events' => ['required', 'array'],
                'events.*' => ['required', 'array'],
                'events.*.event_id' => ['required', 'integer', 'exists:sport_events,id'],
                'events.*.bet_option' => ['required', 'string', 'in:home_win,draw,away_win'],
                'is_flexed' => ['required', 'boolean'],
            ], [
                'events.min' => 'Please select at least 4 events.',
            ]);

            $user = Auth::user();

            $placeBet($user, $data['amount'], $data['events'], $data['is_flexed']);

            return back();
        } catch (Exception $ex) {
            report($ex);

            return back()->withErrors($ex->getMessage());
        }
    }
}
