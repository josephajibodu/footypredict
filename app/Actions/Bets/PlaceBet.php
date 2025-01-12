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
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PlaceBet
{
    public const START_BET_CODE = 100_000;

    public const BET_CODE_CACHE_KEY = "last_bet_id";

    public function __construct(public BetSetting $betSetting) {}

    public function __invoke(User $user, float $amount, array $sportEvents, bool $isFlexed): Bet
    {
        return DB::transaction(function () use ($isFlexed, $user, $amount, $sportEvents) {
            $amountInUnit = $amount * 100;

            // Debit User
            $user->debit($amount, 'Betting stake');

            // Get multiplier for the type of bet
            $multiplierSettings = $this->betSetting->selection_config;
            $validMultiplier = collect($multiplierSettings)->where('selection', count($sportEvents))->first();

            if (! $validMultiplier) {
                throw new Exception('This is an error from us. Please contact our support if it persists');
            }

            $multiplier = floatval($validMultiplier['main']);

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

            $lastBetId = Cache::remember(self::BET_CODE_CACHE_KEY, now()->addMinutes(60), function () {
                return Bet::query()->max('code') ?? self::START_BET_CODE;
            });

            $newBetCode = $lastBetId + 1;
            Cache::put(self::BET_CODE_CACHE_KEY, $newBetCode);

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
