<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Process;

class ProcessController extends Controller
{
    protected $process;
    /**
     * Create a new controller instance.
     *
     * @param Process $process
     */
    public function __construct(Process $process)
    {
        $this->process = $process;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $processes = $this->process
            ->with('state:id,federal_state,name_state,active')
            ->orderBy('opening_date', 'desc')
            ->get();

        return $processes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate($this->process->rules(), $this->process->feedback());

        $process = $this->process->create($request->all());

        return $process;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $process = $this->process->find($id);

        if ($process === null) {
            return response()->json(['error' => 'Processo pesquisado não encontrado!'], 404);
        }

        return $process;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $process = $this->process->find($id);

        if ($process === null) {
            return response()->json(['error' => 'Impossível realizar atualização, o processo pesquisado não foi encontrado!'], 404);
        }

        $request->validate($this->process->rules(), $this->process->feedback());

        $process->update($request->all());

        return $process;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $process = $this->process->find($id);

        if ($process === null) {
            return response()->json(['error' => 'Impossível realizar a exclusão, o processo pesquisado não foi encontrado!'], 404);
        }

        $process->delete();

        return ['message' => 'O processo foi removido com sucesso!'];
    }
}
