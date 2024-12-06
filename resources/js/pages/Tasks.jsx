import Authentication from "./Authentication"
import TaskList from "../components/TaskList";
import CreateTask from "../components/tasks/CreateTask";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import {  ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
const Tasks = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState('http://localhost:8000/api/tasks');

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
            })
            console.log(tasks);
        } catch (e) {
            console.log(e);
        }
    }, [url])
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

    const handelNextPage = () => {
        if (links.next) setUrl(links.next);
    }

    const handelPreviousPage = () => {
        if (links.prev) setUrl(links.prev);
    }

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

                <div className="flex justify-between items-center">
                    {links.prev ? (
                        <button
                            onClick={handelPreviousPage}
                            className="flex justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 mb-6"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-2 mt-0.5" />
                            Previous
                        </button>
                    ) : (
                        <div className="w-[100px]"></div>
                    )}

                    {links.next ? (
                        <button
                            onClick={handelNextPage}
                            className="flex justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 mb-6"
                        >
                            Next
                            <ArrowRightIcon className="h-5 w-5 ml-2 mt-0.5" />
                        </button>
                    ) : (
                        <div className="w-[100px]"></div>
                    )}
                </div>


                <CreateTask />
                <TaskList tasks={tasks} />
            </div>

        </>
    )
}

export default Tasks