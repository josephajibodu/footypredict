<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiBetResource;
use App\Models\Bet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Filament\authorize;

class ViewBetSlipController extends Controller
{
    public function __invoke(Bet $bet)
    {
        authorize('view', $bet);

        $bet->load(['sportEvents', 'sportEvents.team1', 'sportEvents.team2', 'transaction']);

        return Inertia::render('Bets/BetShowPublic', [
            'bet' => ApiBetResource::make($bet),
        ]);
    }
}
