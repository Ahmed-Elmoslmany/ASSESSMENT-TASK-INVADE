const Modal = ({ taskData, handleSubmit, handleInputChange, closeModal }) => {
    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}>
            <div
                className="bg-white rounded-lg w-96 p-6 relative"
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={taskData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={taskData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            name="status"
                            value={taskData.status}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <select
                            name="category_id"
                            value={taskData.category_id}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        >
                            <option value={1}>Personal</option>
                            <option value={2}>Work</option>
                            <option value={3}>Urgent</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={taskData.due_date}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal