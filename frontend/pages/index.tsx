import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Layout>
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to Copa Streaming Chat
        </Typography>
        <Typography variant="body1" gutterBottom>
          Connect with your friends and family through video calls and chat.
        </Typography>
        {isAuthenticated ? (
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => login('username', 'password')}>
            Login
          </Button>
        )}
      </Container>
    </Layout>
  );
};

export default HomePage;
