<?php

namespace App\Models;

 use Carbon\Carbon;
 use Database\Factories\UserFactory;
 use Filament\Models\Contracts\HasName;
 use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

 /**
  * Class User
  *
  * @property int $id                The unique identifier for the user.
  * @property string $first_name      The first name of the user.
  * @property string $last_name       The last name of the user.
  * @property string $username        The unique username of the user.
  * @property string|null $mobile_number The mobile number of the user.
  * @property string|null $gender      The gender of the user (male, female, other).
  * @property string $email           The email address of the user.
  * @property Carbon|null $email_verified_at The timestamp when the email was verified.
  * @property string $nationality     The nationality of the user.
  * @property Carbon $date_of_birth   The date of birth of the user.
  * @property string $password        The password of the user.
  * @property string|null $remember_token The remember token for the user.
  *
  * @property Carbon|null $created_at The timestamp of when the user was created.
  * @property Carbon|null $updated_at The timestamp of when the user was last updated.
  */
class User extends Authenticatable implements MustVerifyEmail, FilamentUser, HasName
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

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
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@footypredict.test') && $this->hasVerifiedEmail();
    }

    public function getFilamentName(): string
    {
        return "$this->username";
    }
}
