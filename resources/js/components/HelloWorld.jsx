import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Authentication from '../pages/Authentication.jsx';
import Tasks from '../pages/Tasks.jsx';
import Trash from '../pages/Trash.jsx';

export default function HelloWorld() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/trash" element={<Trash />} />
                <Route path="/login" element={<Authentication />} />
            </Routes>
        </Router>
    );
}
