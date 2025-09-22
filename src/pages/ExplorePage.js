import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

function ExplorePage() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const usersResponse = await api.get('users/');
            const meResponse = await api.get('users/me/');
            setUsers(usersResponse.data.results);
            setCurrentUser(meResponse.data);
        } catch (error) {
            console.error("Falha ao buscar utilizadores", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFollow = async (userId) => {
        try {
            await api.post(`users/${userId}/follow/`);
            fetchUsers(); // Atualiza a lista para refletir a mudança
        } catch (error) {
            console.error("Erro ao seguir utilizador", error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            await api.post(`users/${userId}/unfollow/`);
            fetchUsers(); // Atualiza a lista
        } catch (error) {
            console.error("Erro ao deixar de seguir utilizador", error);
        }
    };

    if (!currentUser) return <div>A carregar...</div>;

    // Verifica se o utilizador logado está a seguir um determinado utilizador
    const isFollowing = (userId) => {
        return currentUser.following.some(followedUser => followedUser.id === userId);
    };

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '600px', margin: '1rem auto' }}>
                <h1>Explorar Utilizadores</h1>
                {users.filter(user => user.id !== currentUser.id).map(user => (
                    <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                        <span>{user.username}</span>
                        {isFollowing(user.id) ? (
                            <button onClick={() => handleUnfollow(user.id)}>Deixar de Seguir</button>
                        ) : (
                            <button onClick={() => handleFollow(user.id)}>Seguir</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;