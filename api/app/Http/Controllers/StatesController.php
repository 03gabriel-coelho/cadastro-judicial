<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\States;

class StatesController extends Controller
{
    protected $states;
    /**
     * Create a new controller instance.
     *
     * @param States $process
     */
    public function __construct(States $states)
    {
        $this->states = $states;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $states = $this->states->all();

        return $states;
    }
}
