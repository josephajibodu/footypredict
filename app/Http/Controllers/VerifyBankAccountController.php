<?php

namespace App\Http\Controllers;

use App\Actions\Wallets\ResolveAccountNumber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifyBankAccountController extends Controller
{
    public function __invoke(Request $request, ResolveAccountNumber $resolveAccountNumber)
    {
        $data = $request->validate([
            'account_number' => ['required', 'string', 'size:10'],
            'bank_code' => ['required', 'string'],
        ]);

        try {
            $bankDetails = $resolveAccountNumber([
                'account_number' => $data['account_number'],
                'bank_code' => $data['bank_code']
            ]);

            return [
                'bank_details' => $bankDetails
            ];
        } catch (\Exception $e) {
            return back()->with([
                'error' => 'Could not fetch banks'
            ]);
        }
    }
}
