import React from 'react';
import person1 from '../../assets/person1.jpg';

const Profile = () => {
  return (
    <div className='pt-3'>
      <img
        src={person1}
        alt='profile'
        className='h-[44px] w-[44px] rounded-full cursor-pointer object-cover'
      />
    </div>
  );
};

export default Profile;
