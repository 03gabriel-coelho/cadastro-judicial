<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressProcess;

class ProgressProcessController extends Controller
{
    protected $progressProcess;
    /**
     * Create a new controller instance.
     *
     * @param ProgressProcess $process
     */
    public function __construct(ProgressProcess $progressProcess)
    {
        $this->progressProcess = $progressProcess;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $progressProcesses = $this->progressProcess->all();

        return $progressProcesses;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $progressProcess = $this->progressProcess->create($request->all());

        return $progressProcess;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $progressProcess = $this->progressProcess->find($id);

        return $progressProcess;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $progressProcess = $this->progressProcess->find($id);

        $progressProcess->update($request->all());

        return $progressProcess;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $progressProcess = $this->progressProcess->find($id);

        $progressProcess->delete();

        return ['msg' => 'O progresso do processo foi removido com sucesso!'];
    }
}
