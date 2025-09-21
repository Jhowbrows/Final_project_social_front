import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Post from '../components/Post';

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
            <div style={{maxWidth: '640px', margin: '0 auto'}}>
                <h1>Feed de Notícias</h1>
                <form onSubmit={handleCreatePost} style={{ padding: '1rem', margin: '0 1rem' }}>
                    <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="O que está acontecendo?" style={{ width: '100%', minHeight: '80px', padding: '10px', boxSizing: 'border-box' }}/>
                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Postar</button>
                </form>
                <div>
                    {loading ? <p>Carregando...</p> : posts.length > 0 ? (
                        posts.map(post => <Post key={post.id} post={post} onUpdate={fetchPosts} />)
                    ) : (
                        <p style={{textAlign: 'center', padding: '1rem'}}>Seu feed está vazio. Siga alguém para ver as postagens.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default FeedPage;