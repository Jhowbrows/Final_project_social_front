import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('users/me/');
                setProfile(response.data);
            } catch (error) { console.error("Falha ao buscar perfil", error); }
        };
        fetchProfile();
    }, []);

    if (!profile) return <div><Navbar/>Carregando perfil...</div>;

    return (
        <div>
            <Navbar />
            <div style={{maxWidth: '600px', margin: '1rem auto', padding: '1rem'}}>
                <h1>Perfil de {profile.username}</h1>
                <p><strong>Nome:</strong> {profile.first_name || 'Não informado'} {profile.last_name || ''}</p>
                <p><strong>Email:</strong> {profile.email || 'Não informado'}</p>
                <hr/>
                <h3>Seguindo ({profile.following.length})</h3>
                <ul>{profile.following.map(user => <li key={user.id}>{user.username}</li>)}</ul>
                <h3>Seguidores ({profile.followers.length})</h3>
                <ul>{profile.followers.map(user => <li key={user.id}>{user.username}</li>)}</ul>
            </div>
        </div>
    );
}
export default ProfilePage;