import React, { useState, useEffect, useCallback } from 'react';
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
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Foto de perfil atualizada com sucesso!');
            fetchProfile(); 
        } catch (error) {
            setMessage('Falha ao atualizar a foto de perfil.');
            console.error(error);
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
            console.error(error);
        }
    };


    if (!profile) return <div><Navbar />Carregando perfil...</div>;

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '600px', margin: '1rem auto', padding: '1rem' }}>
                <h1>Perfil de {profile.username}</h1>

                
                {profile.profile.profile_picture ? (
                    <div>
                        <img 
                            src={`${profile.profile.profile_picture}`} 
                            alt="Foto de perfil" 
                            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                        
                        <button onClick={handlePhotoDelete} style={{ display: 'block', marginTop: '10px' }}>
                            Remover Foto
                        </button>
                    </div>
                ) : (
                    <p>Sem foto de perfil.</p>
                )}

                
                
                <p><strong>Nome:</strong> {profile.first_name || 'Não informado'} {profile.last_name || ''}</p>

                <p><strong>Email:</strong> {profile.email || 'Não informado'}</p>

                {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}

                <hr style={{ margin: '2rem 0' }} />

                <form onSubmit={handlePhotoUpdate}>
                    <h3>Alterar Foto de Perfil</h3>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    <button type="submit">Guardar Foto</button>
                </form>

                <hr style={{ margin: '2rem 0' }} />

                <form onSubmit={handleProfileUpdate}>
                    <h3>Alterar Nome</h3>
                    <input type="text" placeholder="Primeiro Nome" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Último Nome" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <button type="submit">Guardar Nome</button>
                </form>

                <hr style={{ margin: '2rem 0' }} />

                <form onSubmit={handlePasswordChange}>
                    <h3>Alterar Senha</h3>
                    <input type="password" placeholder="Senha Antiga" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                    <input type="password" placeholder="Nova Senha" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    <button type="submit">Alterar Senha</button>
                </form>

                <hr style={{ margin: '2rem 0' }} />
                
                <h3>Seguindo ({profile.following.length})</h3>
                <ul>{profile.following.map(user => <li key={user.id}>{user.username}</li>)}</ul>
                
                <h3>Seguidores ({profile.followers.length})</h3>
                <ul>{profile.followers.map(user => <li key={user.id}>{user.username}</li>)}</ul>
            </div>
        </div>
    );
}

export default ProfilePage;