<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DepositController extends Controller
{
    public function index()
    {
        if (! request()->has('amount')) {
            return redirect()->route('wallet');
        }

        return Inertia::render('Deposit', [
            'amount' => request()->input('amount')
        ]);
    }
}
