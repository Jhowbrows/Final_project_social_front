import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Utilizador" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                    <button type="submit">Entrar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p>Não tem uma conta? <Link to="/register">Registe-se</Link></p>
            </div>
        </div>
    );
}
export default LoginPage;