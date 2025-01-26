<?php

namespace App\Http\Controllers;

use App\Actions\Transactions\InitiateFundWithdrawal;
use App\Actions\Wallets\CreatePayoutToBankAccount;
use App\Actions\Wallets\GetPaymentBanks;
use App\Http\Resources\ApiWithdrawalAccountResource;
use App\Integrations\SwervPay\PayoutData;
use App\Models\WithdrawalAccount;
use App\Models\WithdrawalBlacklist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class WithdrawalController extends Controller
{
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

        $isBlacklisted = WithdrawalBlacklist::query()->where('user_id', auth()->id())->exists();

        if ($isBlacklisted) {
            Log::error('The user is blacklisted from withdrawals');

            return back()->withErrors(['account_id' => 'You are not allowed to make withdrawals at the moment.']);
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
