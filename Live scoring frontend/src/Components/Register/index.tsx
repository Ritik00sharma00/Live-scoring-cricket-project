import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import './style.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Perform registration logic here (e.g., API call)
    // For now, we'll just log in the user after registration
    dispatch(login());
    navigate('/home');
  };

  const handleNavigateToLogin = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className='reg-container'>
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
          Register
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
        <TextField
          type="password"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1.5 }}
          onClick={handleNavigateToLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
    </div>
  );
};

export default Register;
