import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TaskContainer from '../components/tasks/TaskContainer';
import TaskBody from '../components/tasks/TaskBody';
import Task from '../components/tasks/Task';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Trash = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    const handleRestoreTask = async (taskId) => {
        try {
            console.log(localStorage.getItem('authToken'));
            const response = await axios.patch(`http://localhost:8000/api/tasks/restore/${taskId}`, null, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                toast.success('Task Restored Successfully!', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Error Restoring Task!', { autoClose: 2000 });
        }
    };

    useEffect(() => {
        try {
            axios.get('http://localhost:8000/api/tasks/soft-delete', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                setTasks(res.data.data);
            })
        } catch (e) {
            toast.error('Error Fetching Tasks!', { autoClose: 2000 });
        }
    }, [tasks])


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [navigate]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                draggable={false}
                theme="colored"
                style={{ fontSize: '1rem', fontWeight: 'bold' }}

            />
            <div className="p-6 align-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 center">
                    {tasks.map((task) => (
                        <div className='group relative bg-gray-100 rounded-md p-4 opacity-50 hover:opacity-100 hover:bg-gray-200' key={task.id}>
                            <TaskContainer task={task} key={task.id}>
                                <TaskBody task={task} key={task.id} />
                            </TaskContainer>

                            <button onClick={() => handleRestoreTask(task.id)} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-00 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 font-semibold'>
                                Restore
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </>

    )
}

export default Trash