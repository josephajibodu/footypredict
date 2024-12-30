<?php

namespace App\Http\Controllers;

use App\Actions\Wallets\ResolveAccountNumber;
use Exception;
use Illuminate\Http\Request;

class VerifyBankAccountController extends Controller
{
    public function __invoke(Request $request, ResolveAccountNumber $resolveAccountNumber)
    {
        $data = $request->validate([
            'account_number' => ['required', 'size:10', 'string'],
            'bank_code' => ['required', 'string'],
        ]);

        try {
            $bankDetails = $resolveAccountNumber([
                'account_number' => $data['account_number'],
                'bank_code' => $data['bank_code'],
            ]);

            return response($bankDetails);
        } catch (Exception $e) {
            report($e);

            return response('Could not fetch banks', 400);
        }
    }
}
