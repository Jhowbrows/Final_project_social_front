import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('users/register/', { username, password });
            navigate('/login');
        } catch (err) { setError('Falha no registro. O nome de usuário pode já existir.'); }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Registo</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Utilizador" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                    <button type="submit">Registar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
            </div>
        </div>
    );
}
export default RegisterPage;