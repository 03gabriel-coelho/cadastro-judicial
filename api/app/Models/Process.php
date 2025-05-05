<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    protected $fillable = [
        'process_number',
        'opening_date',
        'description',
        'customer',
        'attorney',
        'state_id',
    ];
}
