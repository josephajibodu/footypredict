<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Wallet;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     * @throws Exception
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'mobile_number' => ['required', 'string', 'regex:/^(?:\+234|0)(70|80|81|90|91)\d{8}$/'],
            'nationality' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date', 'before:' . now()->subYears(18)->toDateString()],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'terms' => ['required', 'boolean'],
            'account_email' => ['required', 'boolean'],
        ], [
            'mobile_number.regex' => 'Enter a valid phone number (e.g., 08012345678 or +2348012345678).',
            'date_of_birth.before' => 'You must be at least 18 years old to register.'
        ]);

        try {
            DB::beginTransaction();

            $user = User::query()->create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'mobile_number' => $request->mobile_number,
                'nationality' => $request->nationality,
                'date_of_birth' => $request->date_of_birth,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            Log::info('User created successfully', ['user_id' => $user->id]);

            $wallet = Wallet::query()->create(['user_id' => $user->id]);
            Log::info('Wallet created successfully', ['wallet_id' => $wallet->id]);

            event(new Registered($user));

            Auth::login($user);

            DB::commit();

            return redirect(route('events', absolute: false));
        } catch (Exception $ex) {
            DB::rollBack();
            Log::error('User registration failed', [
                'email' => $request->email,
                'error' => $ex->getMessage(),
            ]);
            return back()->withErrors(['error' => 'Registration failed, please try again.']);
        }
    }
}
