<?php

namespace App\Models;

use App\Enums\AvailablePermission;
use App\Enums\Currency;
use App\Enums\UserGender;
use App\Traits\HasBets;
use App\Traits\HasManyTransactions;
use App\Traits\HasTransaction;
use App\Traits\HasWallet;
use App\Traits\HasWithdrawalAccount;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

/**
 * Class User
 *
 * @property int $id The unique identifier for the user.
 * @property string $first_name The first name of the user.
 * @property string $last_name The last name of the user.
 * @property-read string $full_name
 * @property string $username The unique username of the user.
 * @property string|null $mobile_number The mobile number of the user.
 * @property UserGender|null $gender The gender of the user (male, female, other).
 * @property string $email The email address of the user.
 * @property Carbon|null $email_verified_at The timestamp when the email was verified.
 * @property string $nationality The nationality of the user.
 * @property Currency $currency
 * @property Carbon $date_of_birth The date of birth of the user.
 * @property string $password The password of the user.
 * @property string|null $remember_token The remember token for the user.
 * @property Carbon|null $created_at The timestamp of when the user was created.
 * @property Carbon|null $updated_at The timestamp of when the user was last updated.
 * @property-read Collection<Bet> $bets
 */
class User extends Authenticatable implements FilamentUser, HasName, MustVerifyEmail
{
    use HasBets;

    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    use HasRoles;
    use HasTransaction;
    use HasManyTransactions;
    use HasWallet;
    use HasWithdrawalAccount;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'mobile_number',
        'gender',
        'email',
        'nationality',
        'date_of_birth',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function fullName(): Attribute
    {
        return Attribute::make(
            get: fn () => "$this->first_name $this->last_name",
        );
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'gender' => UserGender::class,
            'currency' => Currency::class,
        ];
    }

    public function avatar(): string
    {
        //        if ($this->hasMedia('avatar')) {
        //            return $this->getFirstMediaUrl('avatar');
        //        }

        $hash = hash('sha256', $this->email);
        $default = 'https://github.com/shadcn.png';

        return "https://www.gravatar.com/avatar/$hash?d=$default";
    }

    public function canAccessPanel(Panel $panel): bool
    {
        if (app()->environment(['local', 'testing'])) {
            return true;
        }

        return $this->can(AvailablePermission::AccessAdminDashboard);
    }

    public function getFilamentName(): string
    {
        return "$this->username";
    }
}
