<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{any}', function () {
    return view('welcome');  // This should return the Blade view where your React app is rendered
})->where('any', '.*');

// use App\Http\Controllers\TaskController;

// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('tasks', TaskController::class);
//     // Route::patch('tasks/restore/{id}', [TaskController::class, 'restore']);
// });