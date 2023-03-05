import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import person1 from '../../assets/person1.jpg';
import { FaLock } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AiFillCaretDown, AiOutlineFileAdd } from 'react-icons/ai';

const PostAdd = ({ onSetShowModal }) => {
  const [user, setUser] = useState(null);

  // setting user if user changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });

  return (
    <div className='fixed top-0 left-0 h-screen w-full flex justify-center items-center'>
      <div className=' bg-black opacity-40 absolute top-0 left-0 h-full w-full ' />
      {/* <div className='absolute top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full'> */}
      <div className='relative w-full h-full max-w-2xl md:h-auto bg-white z-[2] rounded-lg overflow-hidden'>
        <div className='relative bg-white  shadow '>
          <div className='flex items-start justify-between p-4 border-b rounded-t '>
            <h3 className='text-xl font-semibold text-gray-900 text-center flex-1'>
              Create Post
            </h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  '
              onClick={() => onSetShowModal(false)}
            >
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          {/* post section */}
          <div className='p-6 space-y-6'>
            <div className='flex gap-x-2'>
              <img
                src={user?.photoURL || person1}
                alt='user'
                className='w-10 h-10 rounded-full object-cover overflow-hidden'
              />

              <div className=''>
                <p>{user?.displayName}</p>
                <div className='p-[6px]  rounded-md flex items-center gap-x-[6px] bg-[#EEEAEA] cursor-pointer'>
                  <FaLock />
                  <p className='text-sm font-medium'>Only me</p>
                  <AiFillCaretDown />
                </div>
              </div>
            </div>
            <div>
              {/* text area */}
              <textarea
                className='border-none w-full focus:outline-none resize-none'
                placeholder='What’s on your mind?'
                rows={5}
              />

              <div className='border  p-6 flex items-center justify-between rounded-xl'>
                <p className='font-medium'>Add to your Post</p>
                <div className='flex gap-x-2 items-center'>
                  <AiOutlineFileAdd className='text-xl cursor-pointer' />

                  <HiOutlineDotsHorizontal />
                </div>
              </div>
            </div>
          </div>
          <div className=' border-t border-gray-200 rounded-b w-full'>
            <button
              type='button'
              className='m-2 w-[98%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-none focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default PostAdd;
