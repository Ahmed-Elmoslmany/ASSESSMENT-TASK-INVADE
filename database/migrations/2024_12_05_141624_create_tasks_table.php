<?php

use App\Models\Category;
use App\Models\User;
use App\enums\TaskStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
             $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default(TaskStatus::PENDING->value);
            $table->date('due_date')->nullable();
            $table->foreignIdFor(Category::class);
            $table->foreignIdFor(User::class); 
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
