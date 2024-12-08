import Authentication from "./Authentication"
import TaskList from "../components/tasks/TaskList";
import CreateTask from "../components/tasks/CreateTask";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskHeader from "../components/tasks/TaskHeader";
import IconButtons from "../components/IconButtons";
const Tasks = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [links, setLinks] = useState([]);
    const [amount, setAmount] = useState('');
    const [url, setUrl] = useState('http://localhost:8000/api/tasks');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get(url, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                },


            }).then(res => {
                setTasks(res.data.data);
                setLinks(res.data.links);
                setAmount(`Show ${res.data.meta.to ? res.data.meta.to : 0} tasks from ${res.data.meta.total}`);
            })
        } catch (e) {
            console.log(e);
        }
    }, [url, tasks])

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

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);

        const baseUrl = 'http://localhost:8000/api/tasks';
        const newUrl = selectedStatus ? `${baseUrl}?status=${selectedStatus}` : baseUrl;
        setUrl(newUrl);
    };

    const handelNextPage = () => {
        if (links.next) {
            const urlWithStatus = status ? `${links.next}&status=${status}` : links.next;
            setUrl(urlWithStatus);
        }
    }

    const handelPreviousPage = () => {
        if (links.prev) {
            const urlWithStatus = status ? `${links.prev}&status=${status}` : links.prev;
            setUrl(urlWithStatus);
        }
    };

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
        <IconButtons />
            <div className="container mx-auto px-4 py-6 max-w-full text-center mt-10 mb-10">
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

                <TaskHeader amount={amount} links={links} status={status} handleStatusChange={handleStatusChange} handelPreviousPage={handelPreviousPage} handelNextPage={handelNextPage} />


                <CreateTask tasks={tasks} setTasks={setTasks} />
                <TaskList tasks={tasks} />
            </div>

        </>
    )
}

export default Tasks