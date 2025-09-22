import React, { useState } from 'react';
import api from '../services/api';

const postStyle = { border: '1px solid #ccc', padding: '1rem', margin: '1rem auto', borderRadius: '8px', maxWidth: '600px'};
const commentStyle = { background: '#f9f9f9', borderTop: '1px solid #eee', padding: '8px', marginTop: '8px' };

function Post({ post, onUpdate }) {
    const [likes, setLikes] = useState(post.likes_count);
    const [isLiked, setIsLiked] = useState(post.is_liked);
    const [newComment, setNewComment] = useState('');

    const handleLike = async () => {
        try {
            await api.post(`posts/${post.id}/like/`);
            setLikes(isLiked ? likes - 1 : likes + 1);
            setIsLiked(!isLiked);
        } catch (error) { console.error("Erro ao curtir post", error); }
    };


    const handleComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            await api.post(`posts/${post.id}/comment/`, { text: newComment });
            setNewComment('');
            onUpdate(); // Chama a função do pai (FeedPage) para recarregar tudo
        } catch (error) {
            console.error("Erro ao comentar", error);
        }
    };

    return (
        <div style={postStyle}>
            <h4>{post.author.username}</h4>
            <p>{post.content}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
            <div>
                <button onClick={handleLike} style={{ background: isLiked ? 'lightblue' : 'white' }}>
                    Curtir
                </button>
                <span style={{ marginLeft: '10px' }}>Curtidas: {likes}</span>
            </div>
        </div>
    );
}
export default Post;