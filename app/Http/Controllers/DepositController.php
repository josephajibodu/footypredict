<?php

namespace App\Http\Controllers;

use _PHPStan_2f712479f\Nette\Neon\Exception;
use App\Actions\Transactions\InitiateDepositTransaction;
use App\Actions\Wallets\CreatePaymentWallet;
use App\Enums\DepositMethod;
use App\Integrations\SwervPay\CollectionData;
use Illuminate\Container\Container;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DepositController extends Controller
{
    public function store(CreatePaymentWallet $createVBA, InitiateDepositTransaction $createDepositTransaction)
    {
        $data = request()->validate([
            'amount' => ['required', 'numeric', 'min:1'],
        ], [
            'amount' => 'Deposit amount should not be zero(0)',
        ]);

        $user = Auth::user();

        DB::beginTransaction();

        try {
            // Create transactions table for deposit
            $transaction = $createDepositTransaction([
                'amount' => $data['amount'],
                'method' => DepositMethod::BankTransfer->value,
            ]);

            $bankPaymentDetails = $createVBA(new CollectionData(
                amount: $data['amount'],
                reference: $transaction->reference
            ));

            $walletId = $bankPaymentDetails['id'] ?? null;
            if ($walletId === null) {
                throw new Exception("Invalid response from swervepay");
            }

            $transaction->deposit()->update([
                'provider_reference' => $walletId,
                'metadata' => json_encode($bankPaymentDetails),
            ]);

            DB::commit();

            return to_route('transaction.show', [$transaction]);
        } catch (\Exception $ex) {
            DB::rollBack();

            report($ex);

            return back()->with([
                'error' => 'Deposit initiation failed.',
            ]);
        }
    }

    public function verifyPayment(CreatePaymentWallet $createVBA)
    {
        $data = request()->validate([
            'amount' => ['required', 'numeric', 'min:1'],
        ], [
            'amount' => 'Deposit amount should not be zero(0)',
        ]);

        $user = Auth::user();

        try {
            //            $bankPaymentDetails = $createVBA(new CollectionData(
            //                amount: $data['amount']
            //            ));

            $bankPaymentDetails = [
                'id' => 'wlt_7gqZFtnDN9MgKzKdPZSX',
                'reference' => 'ref_VVD8gh9KYza1oXryFF7m',
                'address' => null,
                'account_number' => '4700144508',
                'account_name' => 'FootyPredict',
                'bank_code' => '0198',
                'bank_name' => 'VFD Microfinance Bank',
                'bank_address' => null,
                'account_type' => null,
                'routing_number' => null,
                'balance' => 0,
                'total_received' => 0,
                'pending_balance' => 0,
                'status' => 'ACTIVE',
                'created_at' => '2024-12-27T19:30:07Z',
                'updated_at' => '2024-12-27T19:30:07Z',
            ];

            return to_route('deposit')->with([
                'success' => 'Deposit initiated successfully.',
                'bankPaymentDetails' => $bankPaymentDetails,
                'amount' => $data['amount'],
            ]);
        } catch (\Exception $ex) {
            throw $ex;
        }
    }
}
