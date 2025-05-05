<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressProcess;
use Laravel\Prompts\Progress;

class ProgressProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $progressProcesses = ProgressProcess::all();

        return $progressProcesses;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $progressProcess = ProgressProcess::create($request->all());

        return $progressProcess;
    }

    /**
     * Display the specified resource.
     */
    public function show(ProgressProcess $progressProcess)
    {
        return $progressProcess;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProgressProcess $progressProcess)
    {
        $progressProcess->update($request->all());

        return $progressProcess;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgressProcess $progressProcess)
    {
        $progressProcess->delete();

        return ['msg' => 'O progresso do processo foi removido com sucesso!'];
    }
}
