import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { toast } from 'react-toastify';

const TaskList = ({ tasks, setTasks }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: '',
        category_id: null,
        due_date: '',
    });

    const openModal = (task) => {
        
        setSelectedTask(task);
        setTaskData({
            title: task.title,
            description: task.description,
            status: task.status,
            category_id: mapCategoryToId(task.category),
            due_date: task.due_date,
        });
        setModalOpen(true);
    };

    const mapCategoryToId = (category) => {
        switch (category) {
            case 'Personal':
                return 1;
            case 'Work':
                return 2;
            case 'Urgent':
                return 3;
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(taskData);
        try {
            const response = await axios.patch(`http://localhost:8000/api/tasks/${selectedTask.id}`, taskData, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                }
            });

            if(response.status === 200) {
                toast.success('Task Updated Successfully!', { autoClose: 2000 });

                closeModal();
            }
        } catch (error) {
                toast.error('Error Updating Task!', { autoClose: 2000 });
                closeModal();
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response =await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                }
            });

            if(response.status === 200) {
                toast.success('Task Deleted Successfully!', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Error Deleting Task!', { autoClose: 2000 });
        }
    };

    return (
        <div className="p-6">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {tasks.map((task) => (
        <div
            key={task.id}
            className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 flex flex-col justify-between h-full ${task.status === 'completed' ? 'border-green-500' : 'border-blue-500'}`}
        >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors mb-3">{task.title}</h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">{task.description}</p>
            <div className="mt-4 text-sm text-gray-600 space-y-2 flex-grow">
                <p>Category: <span className="font-semibold text-gray-800">{task.category}</span></p>
                <p>Due Date: <span className="font-semibold text-gray-800">{task.due_date}</span></p>
                <p>Status: <span className="font-semibold text-gray-800">{task.status}</span></p>
            </div>
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
        </div>
    ))}
</div>



            {modalOpen && (
                <Modal 
                taskData={taskData}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default TaskList;
