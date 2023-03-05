import { onAuthStateChanged } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth, db } from '../../firebase';
import person1 from '../../assets/person1.jpg';
import { FaLock } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AiFillCaretDown, AiOutlineFileAdd } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const PostAdd = ({ onSetShowModal }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageUploadRef = useRef();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target?.result);
    };
  };

  // setting user if user changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });

  const postSubmitHandler = async (data) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        caption: data?.caption || '',
        userName: user?.displayName,
        profileImg: user?.photoURL,
        timestamp: serverTimestamp(),
      });

      reset();
      onSetShowModal(false);
      toast.success('Post Added Successfully');
    } catch (e) {
      toast.error('error posting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-full flex justify-center items-center'>
      <div className=' bg-black opacity-40 absolute top-0 left-0 h-full w-full ' />
      {/* <div className='absolute top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full'> */}
      <div className='relative w-full h-full max-w-2xl md:h-auto max-h-[664px] bg-white z-[2] rounded-lg overflow-hidden'>
        <div className='relative bg-white  shadow '>
          <form onSubmit={handleSubmit(postSubmitHandler)}>
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
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {/* post section */}
            <div className='p-6 space-y-6 max-h-[400px] overflow-y-auto'>
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
                  {...register('caption', {
                    required: selectedImage ? false : 'This field is required',
                  })}
                />

                {errors?.caption?.message && (
                  <p className='text-xs text-red-400'>
                    {errors?.caption?.message}
                  </p>
                )}

                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt='feed pic'
                    className='w-full h-auto'
                    // onClick={() => setSelectedImage(null)}
                  />
                ) : (
                  <input
                    ref={imageUploadRef}
                    type='file'
                    className='hidden'
                    onChange={addImageToPost}
                  />
                )}

                <div className='border  p-6 flex items-center justify-between rounded-xl'>
                  <p className='font-medium'>Add to your Post</p>
                  <div className='flex gap-x-2 items-center'>
                    <BiImageAdd
                      className='text-xl cursor-pointer'
                      onClick={() => {
                        imageUploadRef.current?.click();
                      }}
                    />

                    <HiOutlineDotsHorizontal />
                  </div>
                </div>
              </div>
            </div>
            <div className=' border-t border-gray-200 rounded-b w-full'>
              <button
                type='submit'
                className='m-2 w-[98%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-none focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-500'
                disabled={loading}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default PostAdd;
