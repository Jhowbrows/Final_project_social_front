import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
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
            <button className="navbar-logout" onClick={handleLogout}>Sair</button>
        </nav>
    );
}
export default Navbar;