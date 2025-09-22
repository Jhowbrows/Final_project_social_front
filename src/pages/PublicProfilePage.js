import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import '../styles/ProfilePage.css'; 
import '../styles/PublicProfilePage.css'; 

function PublicProfilePage() {
    const { userId } = useParams(); 
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchAllData = useCallback(async () => {
        try {
            
            const profileRes = await api.get(`users/${userId}/`);
            const postsRes = await api.get(`posts/?user_id=${userId}`);
            const meRes = await api.get('users/me/');
            
            setProfile(profileRes.data);
            setPosts(postsRes.data.results);
            setCurrentUser(meRes.data);
        } catch (error) {
            console.error("Falha ao buscar dados do perfil", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const handleFollow = async () => {
        try {
            await api.post(`users/${userId}/follow/`);
            fetchAllData(); 
        } catch (error) { console.error("Erro ao seguir", error); }
    };

    const handleUnfollow = async () => {
        try {
            await api.post(`users/${userId}/unfollow/`);
            fetchAllData(); 
        } catch (error) { console.error("Erro ao deixar de seguir", error); }
    };

    if (!profile || !currentUser) return <div><Navbar />A carregar perfil...</div>;

    const isFollowing = currentUser.following.some(u => u.id === profile.id);

    return (
        <div>
            <Navbar />
            <div className="public-profile-container">
                <img 
                    src={profile.profile_picture || '/default-avatar.png'} 
                    alt="Foto de perfil" 
                    className="profile-picture-large"
                />
                <h1>{profile.username}</h1>
                <p><strong>Nome:</strong> {profile.first_name || ''} {profile.last_name || ''}</p>
                
                <div className="follow-stats">
                    <span><strong>Seguidores:</strong> {profile.followers_count}</span>
                    <span><strong>A seguir:</strong> {profile.following_count}</span>
                </div>

                
                {isFollowing ? (
                    <button onClick={handleUnfollow} className="unfollow-button">Deixar de Seguir</button>
                ) : (
                    <button onClick={handleFollow} className="follow-button">Seguir</button>
                )}
            </div>

            <div className="user-posts-container">
                <h2>Posts de {profile.username}</h2>
                {posts.length > 0 ? (
                    posts.map(post => <Post key={post.id} post={post} onUpdate={fetchAllData} />)
                ) : (
                    <p className='no-post-message'>Este utilizador ainda não tem posts.</p>
                )}
            </div>
        </div>
    );
}

export default PublicProfilePage;