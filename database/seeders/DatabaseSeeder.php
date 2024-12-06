<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Ahmed Elmoslmany',
            'email' => 'a.elmoslmany@invade.com',
            'password' => bcrypt('password'),
        ]);
        foreach (['Personal', 'Work', 'Urgent'] as $categoryName) {
            DB::table('categories')->insert([
                'name' => $categoryName,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        Task::factory(21)->create();
    }
}
