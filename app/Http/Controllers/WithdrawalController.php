<?php

namespace App\Http\Controllers;

use App\Actions\Wallets\GetPaymentBanks;
use App\Http\Resources\ApiWithdrawalAccountResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function create(GetPaymentBanks $getPaymentBanks)
    {
        $user = Auth::user();

        $withdrawalAccounts = $user->withdrawalAccounts()->get();
        $defaultWithdrawalAccount = $withdrawalAccounts->where('is_default', true)->first();

        return Inertia::render('Withdraw', [
            'accounts' => ApiWithdrawalAccountResource::collection($withdrawalAccounts),
            'defaultAccount' => $defaultWithdrawalAccount ? ApiWithdrawalAccountResource::make($defaultWithdrawalAccount) : null,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'account_id' => ['required', 'string'],
        ]);

        return $data;
    }
}
