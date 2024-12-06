import Authentication from "./Authentication"
import {useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Tasks = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

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
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full" role="status"/>
            </div>
        );
    }

    return (
        <>
        <h1>Tasks</h1>
        {/* <Authentication /> */}
        </>
    )
}

export default Tasks