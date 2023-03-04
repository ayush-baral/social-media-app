import React from 'react';
import person1 from '../../assets/person1.jpg';

const Feed = () => {
  return (
    <div className='max-h-[176px] col-span-6'>
      <div className='bg-white rounded-[20px] px-6 pt-4 pb-20 flex gap-x-2 '>
        <img src={person1} alt='Profile' className='h-10 w-10 rounded-full' />
        <textarea
          className='focus:outline-none bg-[#F1F1F1] rounded-[27px] p-4 w-full'
          placeholder=' Whats on your mind Ayush?'
        />
      </div>
    </div>
  );
};

export default Feed;
