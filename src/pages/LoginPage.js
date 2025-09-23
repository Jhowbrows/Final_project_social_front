import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Auth.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { theme, toggleTheme } = useTheme();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('login/', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/feed');
        } catch (err) { setError('Usuário ou senha inválidos.'); }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-logo">SocialHub</h1>
            <button onClick={toggleTheme} className="theme-toggle-button-auth">
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nome de usuario" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                    <button type="submit">Entrar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
            </div>
        </div>
    );
}
export default LoginPage;