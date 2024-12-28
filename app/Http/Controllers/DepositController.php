<?php

namespace App\Http\Controllers;

use App\Actions\Transactions\CreateDepositTransaction;
use App\Actions\Wallets\CreatePaymentWallet;
use App\Enums\DepositMethod;
use App\Integrations\SwervPay\CollectionData;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepositController extends Controller
{
    public function index()
    {
        $bankPaymentDetails = session('bankPaymentDetails');
        $amount = session('amount');

        if (!$amount || !is_numeric($amount)) {
            return redirect()->route('wallet')->with('error', 'Amount is required to make a deposit.');
        }

        return Inertia::render('Deposit', [
            'amount' => $amount,
            'bankPaymentDetails' => $bankPaymentDetails,
        ]);
    }

    public function show(Transaction $deposit)
    {
        $deposit->load('deposit');

        return Inertia::render('Deposit', [
            'transaction' => $deposit
        ]);
    }

    public function store(CreatePaymentWallet $createVBA, CreateDepositTransaction $createDepositTransaction)
    {
        $data = request()->validate([
            'amount' => ['required', 'numeric', 'min:1']
        ], [
            'amount' => 'Deposit amount should not be zero(0)'
        ]);

        $user = Auth::user();

        try {
            // Create transactions table for deposit
            $transaction = $createDepositTransaction([
                'amount' => $data['amount'],
                'method' => DepositMethod::BankTransfer
            ]);

            $bankPaymentDetails = $createVBA(new CollectionData(
                amount: $data['amount'],
                reference: $transaction->reference
            ));

            $transaction->deposit()->update([
                'metadata' => json_encode($bankPaymentDetails)
            ]);

            return to_route('deposit')->with([
                'bankPaymentDetails' => $bankPaymentDetails,
                'amount' => $data['amount']
            ]);
        } catch (\Exception $ex) {
            throw $ex;
            report($ex);

            return back()->with([
                'error' => 'Deposit initiation failed.',
            ]);
        }
    }

    public function verifyPayment(CreatePaymentWallet $createVBA)
    {
        $data = request()->validate([
            'amount' => ['required', 'numeric', 'min:1']
        ], [
            'amount' => 'Deposit amount should not be zero(0)'
        ]);

        $user = Auth::user();

        try {
            //            $bankPaymentDetails = $createVBA(new CollectionData(
            //                amount: $data['amount']
            //            ));

            $bankPaymentDetails = [
                "id" => "wlt_7gqZFtnDN9MgKzKdPZSX",
                "reference" => "ref_VVD8gh9KYza1oXryFF7m",
                "address" => null,
                "account_number" => "4700144508",
                "account_name" => "FootyPredict",
                "bank_code" => "0198",
                "bank_name" => "VFD Microfinance Bank",
                "bank_address" => null,
                "account_type" => null,
                "routing_number" => null,
                "balance" => 0,
                "total_received" => 0,
                "pending_balance" => 0,
                "status" => "ACTIVE",
                "created_at" => "2024-12-27T19:30:07Z",
                "updated_at" => "2024-12-27T19:30:07Z"
            ];

            return to_route('deposit')->with([
                'success' => 'Deposit initiated successfully.',
                'bankPaymentDetails' => $bankPaymentDetails,
                'amount' => $data['amount']
            ]);
        } catch (\Exception $ex) {
            throw $ex;
        }
    }
}
