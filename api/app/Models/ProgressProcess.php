<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgressProcess extends Model
{
    protected $fillable = [
        'date',
        'description',
        'process_id',
    ];
}
