<?php

namespace App\Http\Controllers;

use App\Actions\Bets\PlaceBet;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BetController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $bets = $user->bets;

        return Inertia::render('BetHistory', [
            'bets' => $bets,
        ]);
    }

    public function store(PlaceBet $placeBet)
    {
        $data = request()->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'events' => ['required', 'array', 'min:4'],
            'events.*' => ['required', 'array'],
            'events.*.event_id' => ['required', 'integer', 'exists:sport_events,id'],
            'events.*.bet_option' => ['required', 'string', 'in:home_win,draw,away_win'],
        ], [
            'events.min' => 'Please select at least 4 events.',
        ]);

        $user = Auth::user();

        $placeBet($user, $data['amount'], $data['events']);

        return back();
    }
}
