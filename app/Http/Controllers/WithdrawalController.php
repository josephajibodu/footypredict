<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function create()
    {
        return Inertia::render('Withdraw', [

        ]);
    }
}
