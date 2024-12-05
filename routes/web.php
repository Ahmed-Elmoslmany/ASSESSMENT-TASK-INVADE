<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// use App\Http\Controllers\TaskController;

// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('tasks', TaskController::class);
//     // Route::patch('tasks/restore/{id}', [TaskController::class, 'restore']);
// });