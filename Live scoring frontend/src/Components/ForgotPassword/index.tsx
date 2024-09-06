import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import './style.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null); // State to manage success or error messages
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    // Perform forgot password logic here (e.g., API call)
    // For now, we'll simulate a successful password reset request
    setMessage('Password reset instructions have been sent to your email.');
  };

  const handleNavigateToLogin = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className='forgot-password-container'>
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
            Forgot Password
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
          {message && (
            <Typography
              variant="body2"
              color={message.includes('sent') ? 'success' : 'error'}
              sx={{ marginBottom: 2 }}
            >
              {message}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, padding: 1.5 }}
            onClick={handleForgotPassword}
          >
            Send Reset Instructions
          </Button>
          <Button
            variant="text"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, padding: 1.5 }}
            onClick={handleNavigateToLogin}
          >
            Back to Login
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
