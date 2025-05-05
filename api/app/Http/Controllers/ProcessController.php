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
        $processes = $this->process->all();

        return $processes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $process = $this->process->create($request->all());

        return $process;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $process = $this->process->find($id);

        return $process;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $process = $this->process->find($id);

        $process->update($request->all());

        return $process;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $process = $this->process->find($id);

        $process->delete();

        return ['msg' => 'O processo foi removido com sucesso!'];
    }
}
