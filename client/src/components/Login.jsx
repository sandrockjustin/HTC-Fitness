import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/check-auth')
      .then((response) => {
        if (response.data.isAuthenticated) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error checking auth', error);
      });
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{
        mt: 8,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          DBZ HTC FITNESS
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
