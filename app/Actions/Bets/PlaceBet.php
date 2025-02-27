<?php

namespace App\Actions\Bets;

use App\Enums\BetStatus;
use App\Enums\Currency;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Bet;
use App\Models\Option;
use App\Models\Transaction;
use App\Models\User;
use App\Settings\BetSetting;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PlaceBet
{
    public function __construct(public BetSetting $betSetting) {}

    public function __invoke(User $user, float $amount, array $sportEvents, bool $isFlexed): Bet
    {
        return DB::transaction(function () use ($isFlexed, $user, $amount, $sportEvents) {
            $eventIds = collect($sportEvents)->pluck('event_id');
            $currentTime = Carbon::now()->format('H:i:s');

            $invalidEvents = DB::table('sport_events')
                ->whereIn('id', $eventIds)
                ->where(function ($query) use ($currentTime) {
                    $query->whereRaw("CONCAT(match_date, ' ', kickoff_time) <= ?", [now()->format('Y-m-d H:i:s')]);
                })
                ->pluck('id');

            if ($invalidEvents->isNotEmpty()) {
                throw new Exception("Some matches have already started");
            }

            $amountInUnit = $amount * 100;

            // Debit User
            $user->debit($amount, 'Betting stake');

            // Get multiplier for the type of bet
            $multiplierSettings = $this->betSetting->selection_config;
            $validMultiplier = collect($multiplierSettings)->where('selection', count($sportEvents))->first();

            if (! $validMultiplier) {
                throw new Exception('This is an error from us. Please contact our support if it persists');
            }

            $multiplier = $isFlexed && $validMultiplier['allow_flex'] ? floatval($validMultiplier['flex_0']) : floatval($validMultiplier['main']);

            // Create a transaction record
            $transaction = Transaction::query()->create([
                'reference' => Str::random()."TXN-BET-{$user->id}",
                'description' => 'Bet funding',
                'user_id' => $user->id,
                'amount' => $amountInUnit,
                'type' => TransactionType::Bet,
                'status' => TransactionStatus::Completed,
                'balance' => $user->balance,
                'currency' => Currency::NGN,
            ]);

            do {
                $newBetCode = Str::upper(Str::random(7));
            } while (Bet::query()->where('code', $newBetCode)->exists());

            $bet = Bet::query()->create([
                'code' => $newBetCode,
                'reference' => Str::uuid(),
                'user_id' => $user->id,
                'transaction_id' => $transaction->id,
                'stake' => $amountInUnit,
                'multiplier_settings' => $validMultiplier,
                'potential_winnings' => $amountInUnit * $multiplier,
                'is_flexed' => $isFlexed && $validMultiplier['allow_flex'],
                'status' => BetStatus::Pending,
                'currency' => Currency::NGN,
            ]);

            foreach ($sportEvents as $event) {
                $betOption = Option::query()->where('sport_event_id', $event['event_id'])
                    ->where('type', $event['bet_option'])
                    ->first();

                $bet->sportEvents()->attach($event['event_id'], [
                    'selected_option_id' => $betOption->id,
                    'outcome_option_id' => null,
                    'is_correct' => null,
                ]);
            }

            return $bet;
        });
    }
}