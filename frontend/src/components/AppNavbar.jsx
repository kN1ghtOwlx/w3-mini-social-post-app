import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AppNavbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      localStorage.removeItem('token');
      setCurrentUser(null);
      navigate('/');
    } catch (error) {
      console.log("Error in handleLogout: ", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>SocialApp</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {currentUser ? (
            <>
              <Navbar.Text className="me-3">@{currentUser.username}</Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Navbar.Text>Not logged in</Navbar.Text>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;