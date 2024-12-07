const TaskContainer = ({ children, task }) => {
    return (<div
        key={task.id}
        className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 flex flex-col justify-between h-full ${task.status === 'completed' ? 'border-green-500' : 'border-blue-500'}`}
    >
        {children}
    </div>
    )
}

export default TaskContainer