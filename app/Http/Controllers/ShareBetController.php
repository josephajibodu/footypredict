<?php

namespace App\Http\Controllers;

use App\Models\Bet;

class ShareBetController extends Controller
{
    public function show(string $code)
    {
        return redirect()->route('events', ['code' => $code]);
    }
}
