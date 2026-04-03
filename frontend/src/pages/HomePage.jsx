import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import api from '../api/axios';

const HomePage = ({ currentUser, setCurrentUser }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const res = await api.get("/post");
      setFeed(res.data);
    } catch (error) {
      console.log("Error in fetchFeed: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      <Container style={{ maxWidth: '680px' }}>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : (
          feed.map(post => (
            <PostCard
              key={post._id}
              post={post}
              onUpdate={fetchFeed}
              currentUser={currentUser}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default HomePage;