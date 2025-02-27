<?php

namespace App\Models;

use Database\Factories\TransactionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class Team
 *
 * @property $id
 * @property string $name
 * @property ?string $short_name
 * @property ?string $short_code
 * @property ?string $logo_url
 * @property ?string $country
 * @property Carbon|null $created_at Timestamp of creation.
 * @property Carbon|null $updated_at Timestamp of last update.
 */
class Team extends Model
{
    /** @use HasFactory<TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'short_name',
        'short_code',
        'logo_url',
        'country',
    ];
}
