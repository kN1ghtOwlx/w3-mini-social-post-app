import { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api/axios';

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/post/create', { text, imageUrl: image });
      setText('');
      setImage('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      onPostCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Card className="mb-4 p-3">
      <h6 className="mb-3">Create a Post</h6>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Button type="submit" size="sm">Post</Button>
      </Form>
    </Card>
  );
};

export default CreatePost;