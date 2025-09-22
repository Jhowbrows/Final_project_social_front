import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Post.css'; // Importe o CSS

function Post({ post, onUpdate }) {
    const [likes, setLikes] = useState(post.likes_count);
    const [isLiked, setIsLiked] = useState(post.is_liked);
    const [newComment, setNewComment] = useState('');

    const handleLike = async () => {
        try {
            const response = await api.post(`posts/${post.id}/like/`);
            if (response.data.status === "Post curtido") {
                setLikes(likes + 1);
                setIsLiked(true);
            } else {
                setLikes(likes - 1);
                setIsLiked(false);
            }
        } catch (error) {
            console.error("Erro ao curtir post", error);
        }
    };

    // Função para lidar com o envio de comentários
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
        <div className="post">
            <div className="post-header">
                {/* FOTO DE PERFIL ADICIONADA AQUI */}
                <img 
                    src={post.author.profile_picture || '/default-avatar.png'} // Usa uma imagem padrão se não houver
                    alt="Foto de perfil" 
                    className="profile-picture"
                />
                <span className="post-author">{post.author.username}</span>
            </div>

            <p className="post-content">{post.content}</p>
            <small className="post-timestamp">{new Date(post.created_at).toLocaleString()}</small>
            
            <div className="post-actions">
                <button onClick={handleLike} className={isLiked ? 'liked' : ''}>
                    Curtir
                </button>
                <span>Curtidas: {likes}</span>
            </div>

            <div className="comments-section">
                {post.comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <strong>{comment.author.username}:</strong> 
                        <span>{comment.text}</span>
                    </div>
                ))}
                {/* FORMULÁRIO DE COMENTÁRIO CORRIGIDO */}
                <form onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Adicione um comentário..."
                    />
                    <button type="submit">Publicar</button>
                </form>
            </div>
        </div>
    );
}

export default Post;