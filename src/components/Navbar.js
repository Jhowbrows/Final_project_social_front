import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/feed">Feed</Link>
                <Link to="/explore">Explorar</Link>
                <Link to="/profile">Meu Perfil</Link>
            </div>
            <div className="navbar-action-buttons">
                <button onClick={toggleTheme} className='navbar-theme'>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <button className="navbar-logout" onClick={handleLogout}>Sair</button>
            </div>
        </nav>
    );
}
export default Navbar;