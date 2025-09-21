import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

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
        <div style={{textAlign: 'center', maxWidth: '400px', margin: '5rem auto'}}>
            <h2>Cadastro</h2>
            <form onSubmit={handleRegister}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" required style={{width: '100%', padding: '10px', margin: '5px 0'}}/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required style={{width: '100%', padding: '10px', margin: '5px 0'}}/>
                <button type="submit" style={{width: '100%', padding: '10px', margin: '10px 0'}}>Cadastrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
    );
}
export default RegisterPage;