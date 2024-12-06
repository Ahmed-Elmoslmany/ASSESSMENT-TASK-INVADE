import Authentication from "./Authentication"
import TaskList from "../components/TaskList";
import CreateTask from "../components/tasks/CreateTask";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
const Tasks = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('http://localhost:8000/api/tasks',{

                'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                'Content-Type': 'application/json',
            },


            }).then(res => {
                setTasks(res.data.data);
            })
            console.log(tasks);
        } catch (e) {
            console.log(e);
        }
    },[])
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            navigate('/');

        } else {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full" role="status" />
            </div>
        );
    }

    const safeTasksList = Array.isArray(tasks) ? tasks : [];

    if (safeTasksList.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6 max-w-4xl text-center">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">My Tasks</h2>
                <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
            </div>
        );
    }
    return (
        <>
            <div className="container mx-auto px-4 py-6 max-w-full text-center mt-10 mb-10">

            <h1>Tasks</h1>
            
            <CreateTask />
            <TaskList tasks={tasks} />
            </div>
           
        </>
    )
}

export default Tasks