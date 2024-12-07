const TaskBody = ({ task }) => {
    return (
        <>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors mb-3">{task.title}</h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">{task.description}</p>
            <div className="mt-4 text-sm text-gray-600 space-y-2 flex-grow">
                <p>Category: <span className="font-semibold text-gray-800">{task.category}</span></p>
                <p>Due Date: <span className="font-semibold text-gray-800">{task.due_date}</span></p>
                <p>Status: <span className="font-semibold text-gray-800">{task.status}</span></p>
            </div>
        </>
    )
}

export default TaskBody