<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\States;

class StatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statesData = [
            ['AC', 'Acre'],
            ['AL', 'Alagoas'],
            ['AP', 'Amapá'],
            ['AM', 'Amazonas'],
            ['BA', 'Bahia'],
            ['CE', 'Ceará'],
            ['DF', 'Distrito Federal'],
            ['ES', 'Espírito Santo'],
            ['GO', 'Goiás'],
            ['MA', 'Maranhão'],
            ['MT', 'Mato Grosso'],
            ['MS', 'Mato Grosso do Sul'],
            ['MG', 'Minas Gerais'],
            ['PA', 'Pará'],
            ['PB', 'Paraíba'],
            ['PR', 'Paraná'],
            ['PE', 'Pernambuco'],
            ['PI', 'Piauí'],
            ['RJ', 'Rio de Janeiro'],
            ['RN', 'Rio Grande do Norte'],
            ['RS', 'Rio Grande do Sul'],
            ['RO', 'Rondônia'],
            ['RR', 'Roraima'],
            ['SC', 'Santa Catarina'],
            ['SP', 'São Paulo'],
            ['SE', 'Sergipe'],
            ['TO', 'Tocantins'],
        ];

        foreach ($statesData as [$federal, $name]) {
            States::firstOrCreate(
                ['federal_state' => $federal],
                ['name_state' => $name, 'active' => true]
            );
        }
    }
}
