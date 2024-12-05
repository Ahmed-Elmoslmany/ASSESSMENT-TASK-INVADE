<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
       
        $tasks = auth()->user()->tasks()->with('category')->paginate(10);
        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request)
    {   

        // dd($request->validated());
        $task = auth()->user()->tasks()->create($request->validated());
        return new TaskResource($task);
    }
}
