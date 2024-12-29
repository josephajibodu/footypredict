<?php

namespace App\Http\Controllers;

use App\Actions\Wallets\GetPaymentBanks;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function create(GetPaymentBanks $getPaymentBanks)
    {
        try {
            $banks = $getPaymentBanks();

        } catch (\Exception $e) {
            return Inertia::render('Withdraw', [
                'banks' => []
            ])->with([
                'error' => 'Could not fetch banks'
            ]);
        }

        return Inertia::render('Withdraw', [
            'banks' => $banks
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'bank_id' => ['required', 'string'],
        ]);

        return $data;
    }
}
