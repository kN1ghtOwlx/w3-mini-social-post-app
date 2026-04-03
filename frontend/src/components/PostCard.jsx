import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import api from '../api/axios';

const PostCard = ({post, onUpdate}) => {
    const handleLike = async () => {
        await api.post(`/post/like/${post._id}`);
        onUpdate();
    }


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
      </Card.Body>
    </Card>
  )
}

export default PostCard