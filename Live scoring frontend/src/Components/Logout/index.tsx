import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleLogout}
      sx={{ marginTop: 2 }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
