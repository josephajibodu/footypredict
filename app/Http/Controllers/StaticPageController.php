<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome');
    }

    public function faq()
    {
        return Inertia::render('FAQ');
    }
}
