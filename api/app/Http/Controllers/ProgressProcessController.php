<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressProcess;
use App\Models\Process;

class ProgressProcessController extends Controller
{
    protected $progressProcess;
    protected $process;
    /**
     * Create a new controller instance.
     *
     * @param ProgressProcess $process
     */
    public function __construct(ProgressProcess $progressProcess, Process $process)
    {
        $this->progressProcess = $progressProcess;
        $this->process = $process;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $progressProcesses = $this->progressProcess->with('process')->get();

        return $progressProcesses;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate($this->progressProcess->rules(), $this->progressProcess->feedback());

        $progressProcess = $this->progressProcess->create($request->all());

        return $progressProcess;
    }

    /**
     * Display the specified resource.
     */
    public function show($idProcess)
    {
        $process = $this->process->find($idProcess);

        if($process === null) {
            return response()->json(['error' => 'Processo pesquisado não encontrado!'], 404);
        }

        $progressProcess = $this->progressProcess->where('process_id', $idProcess)->get();

        return $progressProcess;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $progressProcess = $this->progressProcess->find($id);

        if($progressProcess === null) {
            return response()->json(['error' => 'Impossível realizar atualização, o processo pesquisado não foi encontrado!'], 404);
        }

        $request->validate($this->progressProcess->rules(), $this->progressProcess->feedback());

        $progressProcess->update($request->all());

        return $progressProcess;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $progressProcess = $this->progressProcess->find($id);

        if($progressProcess === null) {
            return response()->json(['error' => 'Impossível realizar a exclusão, o processo pesquisado não foi encontrado!'], 404);
        }

        $progressProcess->delete();

        return ['message' => 'O progresso do processo foi removido com sucesso!'];
    }
}
