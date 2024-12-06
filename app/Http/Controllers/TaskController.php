<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\User;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(protected TaskService $taskService){}

    public function index()
    {
        $tasks = auth()->user()->tasks()->with('category')->paginate(10);
        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = auth()->user()->tasks()->create($request->validated());
        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $task = $this->taskService->getTask(auth()->user(), $id);

        $task->update($request->validated());

        return new TaskResource($task);
    }

    public function destroy($id)
    {
        $task = $this->taskService->getTask(auth()->user(), $id);
        
        $task->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Task has been soft deleted',
        ], 200);
    }

    public function restore($id)
    {
        $task = auth()->user()->tasks()->onlyTrashed()->findOrFail($id);

        if (!$task) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Task not found'
            ], 404);
        }

        $task->restore();

        return response()->json([
            'status' => 'success',
            'message' => 'Task has been restored',
        ], 200);
    }
}
