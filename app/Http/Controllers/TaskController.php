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

    public function index(Request $request)
    {
        $status = $request->query('status');

        $tasksQuery = auth()->user()->tasks()->latest()->with('category');

        if ($status) {
            $tasksQuery->where('status', $status);
        }

        $tasks = $tasksQuery->paginate(10);
        
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

/*************  ✨ Codeium Command ⭐  *************/
/******  793cd329-29de-43ca-8079-b07224618e9f  *******/
    public function softDelete(Request $request){
        $trashQeury = auth()->user()->tasks()->onlyTrashed();
        $status = $request->query('status');

        if($status){
            $trashQeury->where('status', $status);
        }
        
        $softDeletedTasks = $trashQeury->paginate(10);

        return TaskResource::collection($softDeletedTasks);
    }
}
