import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuthPage = ({ setCurrentUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/users/login' : '/users/signup';
      const res = await api.post(endpoint, form);
      localStorage.setItem('token', res.data.token);
      setCurrentUser(res.data);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="p-4">
        <h4 className="mb-4">{isLogin ? 'Login' : 'Create an account'}</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={handleChange} required />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" className="w-100">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Form>
        <p className="mt-3 text-center" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
      </Card>
    </Container>
  );
};

export default AuthPage;