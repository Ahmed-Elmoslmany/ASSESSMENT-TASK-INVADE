import TaskBody from "./TaskBody";
import TaskContainer from "./TaskContainer";

const Task = ({ task, openModal, handleDelete }) => {
    return (
        <TaskContainer task={task}>
            <TaskBody task={task} />
            <div className="flex justify-between mt-4 space-x-3 space-y-2 sm:space-y-0">
                <button
                    onClick={() => openModal(task)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 w-full sm:w-auto font-semibold"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(task.id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors transform hover:scale-105 w-full sm:w-auto font-semibold"
                >
                    Delete
                </button>
            </div>
        </TaskContainer>
    );
}

export default Task