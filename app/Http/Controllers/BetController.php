<?php

namespace App\Http\Controllers;

use App\Actions\Bets\PlaceBet;
use App\Enums\BetStatus;
use App\Enums\LogChannel;
use App\Http\Resources\ApiBetResource;
use App\Http\Resources\ApiBetSummaryResource;
use App\Models\Bet;
use App\Settings\BetSetting;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BetController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $betsQuery = $user->bets()
            ->with(['sportEvents', 'sportEvents.team1', 'sportEvents.team2']);

        if ($request->has('status')) {
            if ($request->input('status') == 'settled') {
                $betsQuery->whereIn('status', [BetStatus::Won, BetStatus::Lost, BetStatus::Voided]);
            } elseif ($request->input('status') == 'unsettled') {
                $betsQuery->where('status', BetStatus::Pending);
            }
        }

        $bets = $betsQuery->latest()->paginate()->withQueryString();

        return Inertia::render('Bets/BetHistory', [
            'bets' => Inertia::defer(fn() => ApiBetSummaryResource::collection($bets)),
        ]);
    }

    public function show(Bet $bet)
    {
        $bet->load(['sportEvents', 'sportEvents.team1', 'sportEvents.team2', 'transaction']);

        return Inertia::render('BetShow', [
            'bet' => ApiBetResource::make($bet),
        ]);
    }

    public function store(Request $request, PlaceBet $placeBet, BetSetting $betSetting)
    {
        $data = request()->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'events' => ['required', 'array', "min:$betSetting->min_selection"],
            'events.*' => ['required', 'array'],
            'events.*.event_id' => ['required', 'integer', 'exists:sport_events,id'],
            'events.*.bet_option' => ['required', 'string', 'in:home_win,draw,away_win'],
            'is_flexed' => ['required', 'boolean'],
        ], [
            'events.min' => "Please select at least $betSetting->min_selection events.",
        ]);

        if (count($data['events']) > $betSetting->max_selection) {
            return back()->withErrors("You can only select up to {$betSetting->max_selection} matches");
        }

        if (floatval($data['amount']) > $betSetting->max_stake) {
            $maxStake = to_money($betSetting->max_stake);
            return back()->withErrors("Maximum stake allowed is $maxStake");
        }

        try {
            $user = Auth::user();

            $placeBet($user, $data['amount'], $data['events'], $data['is_flexed']);

            return back();
        } catch (Exception $ex) {
            report($ex);
            Log::channel(LogChannel::Bet->value)->error('Bet placement failed', [
                'user_id' => Auth::id(),
                'error' => $ex->getMessage(),
                'trace' => $ex->getTraceAsString(),
            ]);

            return back()->withErrors("An error occurred while placing your bet. Please try again later.");
        }
    }
}
