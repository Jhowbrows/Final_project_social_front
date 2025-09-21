import React, { useState } from 'react';
import api from '../services/api';

const postStyle = { border: '1px solid #ccc', padding: '1rem', margin: '1rem auto', borderRadius: '8px', maxWidth: '600px'};

function Post({ post, onUpdate }) {
    const [likes, setLikes] = useState(post.likes_count);
    const [isLiked, setIsLiked] = useState(post.is_liked);

    const handleLike = async () => {
        try {
            await api.post(`posts/${post.id}/like/`);
            setLikes(isLiked ? likes - 1 : likes + 1);
            setIsLiked(!isLiked);
        } catch (error) { console.error("Erro ao curtir post", error); }
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