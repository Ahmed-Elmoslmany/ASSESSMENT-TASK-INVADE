import { TrashIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
const IconButtons = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="flex justify-between items-center w-full px-4 bg-white">
            <button onClick={() => handleLogout()} className="flex items-center justify-center p-2 text-blue-500 hover:text-blue-700">
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                Logout
            </button>

            <button onClick={() => navigate('/trash')} className="flex items-center bg-red-500 rounded mt-5 hover:bg-red-600 hover:text-white text-white justify-center p-2 text-red-500 hover:text-red-700">
                <TrashIcon className="h-6 w-6" />
                Trash
            </button>
        </div>
    );
};

export default IconButtons;
