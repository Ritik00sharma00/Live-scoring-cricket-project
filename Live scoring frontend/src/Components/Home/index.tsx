import React from 'react';
import Navbar from '../Navbar';
import UserDashboard from '../UserDashboard';
import './style.css';

const Home: React.FC = () => {
  return (
    <>
    <Navbar/>
    <UserDashboard/>
    </>
  );
};

export default Home;
