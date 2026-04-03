import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import api from '../api/axios';
import { Alert } from 'react-bootstrap';

const PostCard = ({post, onUpdate, currentUser}) => {
    const [message, setMessage] = useState('');

    const showGuestMessage = () => {
      setMessage('Please login to like or comment');
      setTimeout(() => setMessage(''), 3000);
    };
  
    const handleLike = async () => {
      if (!currentUser) return showGuestMessage();
      try {
        await api.post(`/post/like/${post._id}`);
        onUpdate();
      } catch (error) {
        console.log("Error in handleLike: ", error);
      }
    };
  
    const handleComment = async (e) => {
      e.preventDefault();
      if (!currentUser) return showGuestMessage();
      const text = e.target.comment.value.trim();
      if (!text) return;
      try {
        await api.post(`/post/comment/${post._id}`, { text });
        e.target.reset();
        onUpdate();
      } catch (error) {
        console.log("Error in handleComment: ", error);
      }
    };


  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>@{post.username}</Card.Subtitle>
        {post.text && <Card.Text>{post.text}</Card.Text>}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="post"
            style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }}
          />
        )}
        {message && (
          <Alert variant="warning" className="py-1 px-2" style={{ fontSize: '13px' }}>
            {message}
          </Alert>
        )}
        <div className='d-flex align-items-center justify-content-between gap-3 mb-2'>
            <span className="text-muted" style={{ fontSize: '14px' }}>💬 {post.comments.length} comments</span>
            <Button onClick={handleLike}>❤️ {post.likes.length}</Button>
        </div>
        {post.comments.map((c, i) => (
            <p key={i} style={{ fontSize: '13px', marginBottom: '4px'}}>
                <strong>@{c.username}: </strong>
                {c.text}
            </p>
        ))}
        <form onSubmit={handleComment} className="d-flex gap-2 mt-2">
          <input name="comment" className="form-control form-control-sm" placeholder="Add a comment..." />
          <button className="btn btn-sm btn-outline-secondary" type="submit">Send</button>
        </form>
      </Card.Body>
    </Card>
  )
}

export default PostCard