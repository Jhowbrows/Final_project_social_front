import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import '../styles/FeedPage.css';

function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPostContent, setNewPostContent] = useState('');

    const fetchPosts = useCallback(async () => {
        try {
            const response = await api.get('feed/');
            setPosts(response.data.results);
        } catch (error) { console.error("Falha ao buscar posts", error); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;
        try {
            await api.post('posts/', { content: newPostContent });
            setNewPostContent('');
            fetchPosts();
        } catch (error) { console.error("Falha ao criar post", error); }
    };

    return (
        <div>
            <Navbar />
            <div className="create-post-form">
                <form onSubmit={handleCreatePost}>
                    <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="O que está acontecendo?"/>
                    <button type="submit">Postar</button>
                </form>
            </div>
            <div>
                {loading ? <p>Carregando...</p> : posts.length > 0 ? (
                    posts.map(post => <Post key={post.id} post={post} onUpdate={fetchPosts} />)
                ) : (
                    <p style={{textAlign: 'center', padding: '1rem'}}>Seu feed está vazio. Siga alguém para ver as postagens.</p>
                )}
            </div>    
        </div>
    );
}
export default FeedPage;