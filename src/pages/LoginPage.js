import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

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
        <div style={{textAlign: 'center', maxWidth: '400px', margin: '5rem auto'}}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" required style={{width: '100%', padding: '10px', margin: '5px 0'}}/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required style={{width: '100%', padding: '10px', margin: '5px 0'}}/>
                <button type="submit" style={{width: '100%', padding: '10px', margin: '10px 0'}}>Entrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
    );
}
export default LoginPage;