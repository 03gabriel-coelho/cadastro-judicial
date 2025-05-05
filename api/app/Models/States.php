<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class States extends Model
{
    protected $fillable = [
        'federal_state',
        'name_state',
        'active',
    ];
}
