<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Process;

class ProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $processes = Process::all();

        return $processes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $process = Process::create($request->all());

        return $process;
    }

    /**
     * Display the specified resource.
     */
    public function show(Process $process)
    {
        return $process;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Process $process)
    {
        $process->update($request->all());

        return $process;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Process $process)
    {
        $process->delete();

        return ['msg' => 'O processo foi removido com sucesso!'];
    }
}
