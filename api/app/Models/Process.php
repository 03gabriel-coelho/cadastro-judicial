<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    use HasFactory;

    public function state()
    {
        return $this->belongsTo(States::class, 'state_id', 'id');
    }

    protected $fillable = [
        'process_number',
        'opening_date',
        'description',
        'customer',
        'attorney',
        'state_id',
    ];

    public function rules()
    {
        return [
            'process_number' => 'required|string|unique:processes,process_number,' . $this->id . '|max:20|min:1',
            'opening_date' => 'required|date',
            'description' => 'required|string|min:1',
            'customer' => 'required|string|max:100|min:1',
            'attorney' => 'required|string|max:100|min:1',
            'state_id' => 'required|integer|exists:states,id',
        ];
    }

    public function feedback()
    {
        return [
            'process_number.required' => 'O número do processo é obrigatório.',
            'process_number.string' => 'O número do processo deve ser uma string.',
            'process_number.max' => 'O número do processo deve ter no máximo 20 caracteres.',
            'process_number.min' => 'O número do processo deve ter no mínimo 1 caractere.',
            'process_number.unique' => 'O número do processo já existe.',
            'opening_date.required' => 'A data de abertura é obrigatória.',
            'opening_date.date' => 'A data de abertura deve ser uma data válida.',
            'description.required' => 'A descrição é obrigatória.',
            'description.string' => 'A descrição deve ser uma string.',
            'description.min' => 'A descrição deve ter no mínimo 1 caractere.',
            'customer.required' => 'O cliente é obrigatório.',
            'customer.string' => 'O cliente deve ser uma string.',
            'customer.max' => 'O cliente deve ter no máximo 100 caracteres.',
            'customer.min' => 'O cliente deve ter no mínimo 1 caractere.',
            'attorney.min' => 'O advogado deve ter no mínimo 1 caractere.',
            'attorney.required' => 'O advogado é obrigatório.',
            'attorney.string' => 'O advogado deve ser uma string.',
            'attorney.max' => 'O advogado deve ter no máximo 100 caracteres.',
            'state_id.required' => 'O estado é obrigatório.',
            'state_id.integer' => 'O estado deve ser um número inteiro.',
            'state_id.exists' => 'O estado informado não existe.',
        ];
    }
}
