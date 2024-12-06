<?php
namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function getTask($user, $taskId)
    {
        $task = $user->tasks()->findOrFail($taskId);
    
        if (!$task) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Task not found'
            ], 404);
        }

        return $task;
    }

    
}
