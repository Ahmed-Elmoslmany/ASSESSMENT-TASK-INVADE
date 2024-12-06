import React, { useState } from 'react';
import Modal from '../Modal';  

const CreateTask = () => {
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
            status: '',
            category_id: 1,
            due_date: '',
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
        try{
            await axios.post('http://localhost:8000/api/tasks', taskData, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                }
            });
            alert('Task created successfully!');
        } catch (error) {
            alert('Error creating task');
            
        }
        // Handle task creation logic here (e.g., make an API call to save the task)
        console.log('Task Created:', taskData);
        closeModal();  
    };

    return (
        <div className="p-6">
            
            <button
                onClick={openModal}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors transform hover:scale-105 mb-6"
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
