<?php

namespace App\Http\Controllers;

use App\Actions\Wallets\GetPaymentBanks;
use App\Enums\Currency;
use App\Enums\WithdrawalAccountType;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AddWithdrawalAccountController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function create(GetPaymentBanks $getPaymentBanks)
    {
        try {
            $banks = $getPaymentBanks();

            return Inertia::render('AddNewBank', [
                'banks' => $banks,
            ]);
        } catch (Exception $e) {
            return Inertia::render('AddNewBank', [
                'banks' => [],
            ])->with([
                'error' => 'Could not fetch banks',
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bank_code' => ['required', 'string'],
            'account_number' => ['required', 'string', 'size:10'],
            'account_name' => ['required', 'string', 'max:255'],
            'bank_name' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors('Validation failed: '.$validator->errors()->first());
        }

        $validated = $validator->validated();

        try {

            $numberOfAccounts = auth()->user()->withdrawalAccounts()->count();
            auth()->user()->withdrawalAccounts()->create([
                'type' => WithdrawalAccountType::FiatBank,
                'payment_provider' => 'swervpay',
                'bank_code' => $validated['bank_code'],
                'bank_name' => $validated['bank_name'],
                'account_number' => $validated['account_number'],
                'account_name' => $validated['account_name'],
                'is_default' => $numberOfAccounts === 0,
                'currency' => Currency::NGN,
            ]);

            return to_route('withdraw')->with('success', 'Withdrawal account added successfully.');
        } catch (Exception $ex) {
            report($ex);

            return redirect()->back()->withErrors('Failed to add withdrawal account. Please try again.');
        }
    }
}
