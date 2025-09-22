import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/ProfilePage.css'; 

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [message, setMessage] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const navigate = useNavigate();

    const fetchProfile = useCallback(async () => {
        try {
            const response = await api.get('users/me/');
            setProfile(response.data);
            setFirstName(response.data.first_name || '');
            setLastName(response.data.last_name || '');
        } catch (error) {
            console.error("Falha ao buscar perfil", error);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.patch('users/me/', { first_name: firstName, last_name: lastName });
            setMessage('Nome atualizado com sucesso!');
            fetchProfile();
        } catch (error) {
            setMessage('Falha ao atualizar o nome.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('users/me/change-password/', { old_password: oldPassword, new_password: newPassword });
            setMessage('Senha alterada com sucesso!');
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            setMessage('Falha ao alterar a senha. Verifique a senha antiga.');
        }
    };

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('users/me/change-username/', { password: currentPassword, new_username: newUsername });
            setMessage('Nome de utilizador alterado com sucesso! Por favor, faça login novamente.');
            
            localStorage.removeItem('token');
            setTimeout(() => navigate('/login'), 2000); 

        } catch (error) {
            setMessage('Falha ao alterar o nome de utilizador. Verifique a sua senha.');
        }
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handlePhotoUpdate = async (e) => {
        e.preventDefault();
        if (!profilePicture) {
            setMessage('Por favor, selecione um ficheiro primeiro.');
            return;
        }
        const formData = new FormData();
        formData.append('profile.profile_picture', profilePicture);

        try {
            await api.patch('users/me/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Foto de perfil atualizada com sucesso!');
            fetchProfile();
        } catch (error) {
            setMessage('Falha ao atualizar a foto de perfil.');
        }
    };

    const handlePhotoDelete = async () => {
        setMessage('');
        try {
            await api.post('users/me/delete-picture/');
            setMessage('Foto de perfil apagada com sucesso!');
            fetchProfile();
        } catch (error) {
            setMessage('Falha ao apagar a foto de perfil.');
        }
    };

    if (!profile) return <div><Navbar />A carregar perfil...</div>;

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    {profile.profile.profile_picture ? (
                        <div>
                            <img 
                                src={profile.profile.profile_picture} 
                                alt="Foto de perfil" 
                                className="profile-picture-large" 
                            />
                        </div>
                    ) : (
                        <p>Sem foto de perfil.</p>
                    )}
                    <h1>{profile.username}</h1>
                    <div className="profile-info">
                        <p><strong>Nome:</strong> {profile.first_name || 'Não informado'} {profile.last_name || ''}</p>
                        <p><strong>Email:</strong> {profile.email || 'Não informado'}</p>
                    </div>
                    <button onClick={handlePhotoDelete} className="photo-delete-button">Remover Foto</button>
                </div>

                {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
                
                <div className="profile-form">
                    <form onSubmit={handlePhotoUpdate}>
                        <h3>Alterar Foto de Perfil</h3>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                        <button type="submit">Salvar Foto</button>
                    </form>
                </div>
                
                <div className="profile-form">
                    <form onSubmit={handleProfileUpdate}>
                        <h3>Alterar Nome</h3>
                        <input type="text" placeholder="Primeiro Nome" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Último Nome" value={lastName} onChange={e => setLastName(e.target.value)} />
                        <button type="submit">Salvar Nome</button>
                    </form>
                </div>

                <div className="profile-form">
                    <form onSubmit={handleUsernameChange}>
                        <h3>Alterar Nome de Utilizador</h3>
                        <p style={{fontSize: '0.8rem', color: 'var(--secondary-text-color)', marginBottom: '1rem'}}>
                            Atenção: Ao alterar o seu nome de utilizador, você será desconectado por segurança.
                        </p>
                        <input type="password" placeholder="Senha Atual para Confirmação" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                        <input type="text" placeholder="Novo Nome de Utilizador" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                        <button type="submit">Alterar Nome de Utilizador</button>
                    </form>
                </div>

                <div className="profile-form">
                    <form onSubmit={handlePasswordChange}>
                        <h3>Alterar Senha</h3>
                        <input type="password" placeholder="Senha Antiga" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                        <input type="password" placeholder="Nova Senha" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        <button type="submit">Alterar Senha</button>
                    </form>
                </div>

                <div className="follow-stats">
                    <span><strong>Seguidores:</strong> {profile.followers.length}</span>
                    <span><strong>Seguindo:</strong> {profile.following.length}</span>
                </div>

                <div className="follow-lists">
                    <h3>Seguindo</h3>
                    <ul>{profile.following.map(user => <li key={user.id}><Link to={`/users/${user.id}`}>{user.username}</Link></li>)}</ul>
                    <h3>Seguidores</h3>
                    <ul>{profile.followers.map(user => <li key={user.id}><Link to={`/users/${user.id}`}>{user.username}</Link></li>)}</ul>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;