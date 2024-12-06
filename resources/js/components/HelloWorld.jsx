import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Authentication from '../pages/Authentication.jsx';
import Tasks from '../pages/Tasks.jsx';

export default function HelloWorld() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/login" element={<Authentication />} />
            </Routes>
        </Router>
    );
}
