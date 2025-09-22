import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', background: '#eee', borderBottom: '1px solid #ccc' }}>
            <Link to="/feed">Feed</Link>
            <Link to="/explore">Explorar</Link>
            <Link to="/profile">Meu Perfil</Link>
            <button onClick={handleLogout}>Sair</button>
        </nav>
    );
}
export default Navbar;