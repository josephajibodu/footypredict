<?php

namespace App\Http\Controllers;

use App\Enums\BetStatus;
use App\Http\Resources\ApiBetSummaryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OpenBetController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $bets = $user->bets()
            ->where('status', BetStatus::Pending)
            ->latest()->with(['sportEvents', 'sportEvents.team1', 'sportEvents.team2'])
            ->paginate()->withQueryString();

        return Inertia::render('Bets/OpenBet', [
            'bets' => Inertia::defer(fn() => ApiBetSummaryResource::collection($bets)),
        ]);
    }
}
