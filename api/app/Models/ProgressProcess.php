<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgressProcess extends Model
{
    public function process()
    {
        return $this->belongsTo(Process::class, 'process_id', 'id');
    }

    protected $fillable = [
        'date',
        'description',
        'process_id',
    ];

    public function rules() {
        return [
            'date' => 'required|date',
            'description' => 'required|string|min:1',
            'process_id' => 'required|integer|exists:processes,id',
        ];
    }

    public function feedback() {
        return [
            'date.required' => 'A data é obrigatória.',
            'date.date' => 'A data deve ser uma data válida.',
            'description.required' => 'A descrição é obrigatória.',
            'description.string' => 'A descrição deve ser uma string.',
            'description.min' => 'A descrição deve ter no mínimo 1 caractere.',
            'process_id.required' => 'O processo é obrigatório.',
            'process_id.integer' => 'O processo deve ser um número inteiro.',
            'process_id.exists' => 'O processo informado não existe.',
        ];
    }
}
