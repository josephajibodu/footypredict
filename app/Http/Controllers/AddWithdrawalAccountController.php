<?php

namespace App\Http\Controllers;

use App\Actions\Wallets\GetPaymentBanks;
use App\Enums\WithdrawalAccountType;
use Illuminate\Http\Request;
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
        } catch (\Exception $e) {
            return Inertia::render('AddNewBank', [
                'banks' => [],
            ])->with([
                'error' => 'Could not fetch banks',
            ]);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bank_code' => ['required', 'string'],
            'account_number' => ['required', 'string', 'size:10'],
            'account_name' => ['required', 'string', 'max:255'],
            'bank_name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $numberOfAccounts = auth()->user()->withdrawalAccounts()->count();
            $withdrawalAccount = auth()->user()->withdrawalAccounts()->create([
                'type' => WithdrawalAccountType::FiatBank,
                'payment_provider' => 'swervpay',
                'bank_id' => $validated['bank_id'],
                'account_number' => $validated['account_number'],
                'account_name' => $validated['account_name'],
                'is_default' => $numberOfAccounts === 0,
            ]);

            return redirect()->back()->with('success', 'Withdrawal account added successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to add withdrawal account. Please try again.');
        }
    }
}
