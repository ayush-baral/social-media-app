import React from 'react';
import Navbar from './Nav';
import Profile from './Profile';

const Header = () => {
  return (
    <div className='bg-white px-[60px]  flex justify-between align-middle'>
      <Navbar />
      <Profile />
    </div>
  );
};

export default Header;
