import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import ExplorePage from './pages/ExplorePage';
import PublicProfilePage from './pages/PublicProfilePage';
import './styles/App.css'; 

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="app-container"> 
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/feed" element={<PrivateRoute><FeedPage /></PrivateRoute>} />
                    <Route path="/explore" element={<PrivateRoute><ExplorePage /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                    <Route path="/users/:userId" element={<PrivateRoute><PublicProfilePage /></PrivateRoute>}/>
                    <Route path="*" element={<Navigate to={localStorage.getItem('token') ? "/feed" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
