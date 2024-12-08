<?php
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('tasks/trashed', [TaskController::class, 'softDelete']);
    Route::patch('tasks/restore/{id}', [TaskController::class, 'restore']);
    Route::apiResource('tasks', TaskController::class);
    Route::apiResource('categories', CategoryController::class);
});


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);