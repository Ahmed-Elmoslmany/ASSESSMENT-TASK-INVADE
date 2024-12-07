import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Task from './Task';
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

            if (response.status === 200) {
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
            const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
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
                    <Task key={task.id} task={task} openModal={openModal} handleDelete={handleDelete} />
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
