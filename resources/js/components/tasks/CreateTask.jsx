import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Modal from '../Modal';

const CreateTask = ({ tasks, setTasks }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: '',
        category_id: '',
        due_date: '',
    });

    const openModal = () => {
        setTaskData({
            title: '',
            description: '',
            status: 'pending',
            category_id: 1,
            due_date: '2024-12-09',
        });
        setModalOpen(true);
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
            const response = await axios.post('http://localhost:8000/api/tasks', taskData, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 201) {
                setTasks((tasks) => [
                    ...tasks,
                    { ...response.data, id: response.data.id || new Date().getTime() },
                ]);

                toast.success('Task Created Successfully!', { autoClose: 2000 });

                closeModal();
            }
        } catch (error) {
            toast.error('Error Creating Task', { autoClose: 2000 });
            closeModal();
        }
        
    };

    return (
        <div className="p-6 bg-white">
            
            <button
                onClick={openModal}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors transform hover:scale-105 mb-6 font-semibold"
            >
                Create Task
            </button>

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

export default CreateTask;
