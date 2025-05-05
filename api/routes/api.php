<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->get('/ping', function () {
    return response()->json(['message' => 'pong']);
});

Route::apiResource('states', 'App\Http\Controllers\StatesController');
Route::apiResource('processes', 'App\Http\Controllers\ProcessController');
Route::apiResource('progress_processes', 'App\Http\Controllers\ProgressProcessController');