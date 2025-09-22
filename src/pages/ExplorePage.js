import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ExplorePage.css';

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
            fetchUsers(); 
        } catch (error) {
            console.error("Erro ao seguir utilizador", error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            await api.post(`users/${userId}/unfollow/`);
            fetchUsers(); 
        } catch (error) {
            console.error("Erro ao deixar de seguir utilizador", error);
        }
    };

    if (!currentUser) return <div>A carregar...</div>;

    
    const isFollowing = (userId) => {
        return currentUser.following.some(followedUser => followedUser.id === userId);
    };

    return (
        <div>
            <Navbar />
            <div className="explore-container">
                <h1>Explorar Utilizadores</h1>
                {users.filter(user => user.id !== currentUser.id).map(user => (
                    <div key={user.id} className="user-list-item">
                        <Link to={`/users/${user.id}`} className="user-link">{user.username}</Link>
                        {isFollowing(user.id) ? (
                            <button onClick={() => handleUnfollow(user.id)} className="unfollow-button">Deixar de Seguir</button>
                        ) : (
                            <button onClick={() => handleFollow(user.id)} className="follow-button">Seguir</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;