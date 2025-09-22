import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Post.css';

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
            onUpdate(); 
        } catch (error) {
            console.error("Erro ao comentar", error);
        }
    };

    return (
        <div className="post">
            <div className="post-header">{post.author.username}</div>
            <p className="post-content">{post.content}</p>
            <small className="post-timestamp">{new Date(post.created_at).toLocaleString()}</small>
            <div className="post-actions">
                <button onClick={handleLike} className={isLiked ? 'liked' : ''}>
                    Curtir
                </button>
                <span style={{ marginLeft: '10px' }}>Curtidas: {likes}</span>
            </div>
        </div>
    );
}
export default Post;