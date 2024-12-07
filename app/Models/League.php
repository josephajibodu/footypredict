<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class League
 *
 * @property $id
 * @property string $name
 * @property ?string $short_code
 * @property string $logo_url
 * @property string $country
 *
 * @property Carbon|null $created_at Timestamp of creation.
 * @property Carbon|null $updated_at Timestamp of last update.
 */
class League extends Model
{
    protected $fillable = [
        'name',
        'logo_url',
        'country'
    ];
}