<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Process;

class ProcessesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $process = new Process();
        $process->process_number = 'PROC0000001';
        $process->opening_date = '2025-05-01';
        $process->description = 'Processo sobre disputa contratual';
        $process->customer = 'Empresa Alpha Ltda.';
        $process->attorney = 'Dr. João Silva';
        $process->state_id = 1;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000002';
        $process->opening_date = '2025-05-02';
        $process->description = 'Processo trabalhista de ex-funcionário';
        $process->customer = 'Empresa Beta S.A.';
        $process->attorney = 'Dra. Maria Souza';
        $process->state_id = 2;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000003';
        $process->opening_date = '2025-05-03';
        $process->description = 'Processo tributário envolvendo ICMS';
        $process->customer = 'Comércio Delta Ltda.';
        $process->attorney = 'Dr. Pedro Santos';
        $process->state_id = 3;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000004';
        $process->opening_date = '2025-05-04';
        $process->description = 'Processo ambiental sobre desmatamento';
        $process->customer = 'Fazenda Verde S.A.';
        $process->attorney = 'Dra. Ana Paula';
        $process->state_id = 4;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000005';
        $process->opening_date = '2025-05-05';
        $process->description = 'Processo civil sobre indenização';
        $process->customer = 'Construtora Eixo Ltda.';
        $process->attorney = 'Dr. Bruno Oliveira';
        $process->state_id = 5;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000006';
        $process->opening_date = '2025-05-06';
        $process->description = 'Processo penal de roubo qualificado';
        $process->customer = 'Ministério Público';
        $process->attorney = 'Dra. Carla Mendes';
        $process->state_id = 6;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000007';
        $process->opening_date = '2025-05-07';
        $process->description = 'Processo familiar sobre guarda de menor';
        $process->customer = 'Sr. Carlos Lima';
        $process->attorney = 'Dr. Eduardo Ramos';
        $process->state_id = 7;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000008';
        $process->opening_date = '2025-05-08';
        $process->description = 'Processo administrativo de licitação';
        $process->customer = 'Prefeitura Municipal';
        $process->attorney = 'Dra. Fernanda Costa';
        $process->state_id = 8;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000009';
        $process->opening_date = '2025-05-09';
        $process->description = 'Processo sobre direito autoral';
        $process->customer = 'Editora Letras S.A.';
        $process->attorney = 'Dr. Gustavo Rocha';
        $process->state_id = 9;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000010';
        $process->opening_date = '2025-05-10';
        $process->description = 'Processo internacional de comércio';
        $process->customer = 'Importadora Global Ltda.';
        $process->attorney = 'Dra. Helena Martins';
        $process->state_id = 10;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000011';
        $process->opening_date = '2025-05-11';
        $process->description = 'Processo imobiliário de usucapião';
        $process->customer = 'Sr. Ivan Sousa';
        $process->attorney = 'Dr. Jorge Faria';
        $process->state_id = 11;
        $process->save();

        $process = new Process();
        $process->process_number = 'PROC0000012';
        $process->opening_date = '2025-05-12';
        $process->description = 'Processo bancário sobre empréstimo';
        $process->customer = 'Banco Financeiro S.A.';
        $process->attorney = 'Dra. Juliana Teixeira';
        $process->state_id = 12;
        $process->save();
    }
}
