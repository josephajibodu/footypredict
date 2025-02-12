<?php

namespace App\Http\Controllers;

use App\Actions\Transactions\InitiateFundWithdrawal;
use App\Actions\Wallets\CreatePayoutToBankAccount;
use App\Actions\Wallets\GetPaymentBanks;
use App\Http\Resources\ApiWithdrawalAccountResource;
use App\Integrations\SwervPay\PayoutData;
use App\Models\WithdrawalAccount;
use App\Models\WithdrawalBlacklist;
use App\Settings\WalletSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class WithdrawalController extends Controller
{
    public function __construct(public WalletSetting $walletSetting)
    {}

    public function create(GetPaymentBanks $getPaymentBanks)
    {
        $user = Auth::user();

        $withdrawalAccounts = $user->withdrawalAccounts()->get();
        $defaultWithdrawalAccount = $withdrawalAccounts->where('is_default', true)->first();
        $isBlacklisted = WithdrawalBlacklist::query()->where('user_id', $user->id)->exists();

        return Inertia::render('Withdraw', [
            'accounts' => ApiWithdrawalAccountResource::collection($withdrawalAccounts),
            'defaultAccount' => $defaultWithdrawalAccount ? ApiWithdrawalAccountResource::make($defaultWithdrawalAccount) : null,
            'can_withdraw' => !$isBlacklisted
        ]);
    }

    public function store(Request $request, CreatePayoutToBankAccount $payoutToBankAccount, InitiateFundWithdrawal $initiateFundWithdrawal)
    {
        $data = $request->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'account_id' => ['required', 'numeric'],
        ]);

        $user = Auth::user();

        $isBlacklisted = WithdrawalBlacklist::query()->where('user_id', $user->id)->exists();
        if ($isBlacklisted) {
            Log::error('The user is blacklisted from withdrawals');

            return back()->withErrors(['account_id' => 'You are not allowed to make withdrawals at the moment.']);
        }

        if (floatval($data['amount']) < $this->walletSetting->minimum_withdrawal_ngn) {
            $minWithdrawal = to_money($this->walletSetting->minimum_withdrawal_ngn);

            return back()->withErrors("The minimum withdrawal amount is $minWithdrawal.");
        }

        if (floatval($data['amount']) > $this->walletSetting->maximum_withdrawal_ngn) {
            $maxWithdrawal = to_money($this->walletSetting->maximum_withdrawal_ngn);

            return back()->withErrors("The maximum withdrawal amount is $maxWithdrawal.");
        }

        if (!$user->bets()->exists()) {
            Log::error('Withdrawal attempt blocked: User has not placed any bets.', [
                'user_id' => $user->id
            ]);

            return back()->withErrors(['account_id' => 'You must place a bet before withdrawing.']);
        }

        DB::beginTransaction();

        try {
            // Validate withdrawal account ownership
            $bank = WithdrawalAccount::query()
                ->where('id', $data['account_id'])
                ->where('user_id', auth()->id())
                ->first();

            if (! $bank) {
                Log::error('Invalid withdrawal account for user', [
                    'data' => $data,
                    'user_id' => auth()->id(),
                ]);

                return back()->withErrors(['account_id' => 'Invalid bank details.']);
            }

            // Initiate fund withdrawal
            $transaction = $initiateFundWithdrawal($data['amount'], $bank, 'swervpay');

            // Payout to bank
            $payoutTransaction = $payoutToBankAccount(new PayoutData(
                bank_code: $bank->bank_code,
                account_number: $bank->account_number,
                amount: $data['amount'],
                currency: 'NGN',
                reference: $transaction->reference,
                narration: "Wallet payout to {$bank->account_name} at {$bank->bank_name}",
            ));

            DB::commit();

            return to_route('wallet')->with(['success' => 'You should get your funds in your bank account soon.']);
        } catch (Throwable $ex) {
            DB::rollBack();

            report($ex);

            return back()->withErrors($ex->getMessage() ?? 'Funds withdrawal failed.');
        }
    }
}
