<?php

namespace App\Http\Controllers;

use App\Models\Bet;

class ShareBetController extends Controller
{
    public function show(Bet $bet)
    {
        // returns the user to the events page
        // then load the events to the betslip
        return $bet;
    }
}
