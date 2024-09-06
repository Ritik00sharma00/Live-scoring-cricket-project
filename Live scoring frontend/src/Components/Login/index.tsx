import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import './style.css';

const Index: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') { // Replace with your authentication logic
      dispatch(login());
      navigate('/home');
    } else {
      setError('Invalid credentials'); // Set the error message
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register'); // Navigate to the registration page
  };

  const handleNavigateToForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the forgot password page
  };

  return (
    <div className='login-container'>
      <Container 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage: 'url(/path/to/your/background-image.jpg)', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          padding: 2,
        }}
      >
        <Paper
          sx={{
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            background: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
          }}
          elevation={3}
        >
          <Typography 
            variant="h4"
            sx={{ 
              marginBottom: 2,
              fontWeight: 700 
            }}
          >
            Login
          </Typography>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: 2 }}
            >
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, padding: 1.5 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, padding: 1.5 }}
            onClick={handleNavigateToRegister}
          >
            Register
          </Button>
          <Button
            variant="text"
            color="error"
            fullWidth
            sx={{ marginTop: 2, padding: 1.5 }}
            onClick={handleNavigateToForgotPassword}
          >
            Forgot Password?
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Index;
