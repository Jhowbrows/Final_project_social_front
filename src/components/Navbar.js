import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsMenuOpen(false);
        navigate('/login');
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-links-desktop">
                    <Link to="/feed">Feed</Link>
                    <Link to="/explore">Explorar</Link>
                    <Link to="/profile">Meu Perfil</Link>
                </div>

                <div className="navbar-actions-desktop">
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button onClick={handleLogout} className="logout-button">Sair</button>
                </div>

                <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div />
                    <div />
                    <div />
                </button>
            </div>

            {isMenuOpen && (
                <div className="navbar-links-mobile">
                    <Link to="/feed" onClick={closeMenu}>Feed</Link>
                    <Link to="/explore" onClick={closeMenu}>Explorar</Link>
                    <Link to="/profile" onClick={closeMenu}>Meu Perfil</Link>
                    <div className="navbar-actions-mobile">
                        <button onClick={toggleTheme}>
                            Mudar Tema {theme === 'light' ? 'Escuro 🌙' : 'Claro ☀️'}
                        </button>
                        <button onClick={handleLogout} className="logout-button">Sair</button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;