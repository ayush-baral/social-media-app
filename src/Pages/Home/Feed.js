import React, { useState } from 'react';
import person1 from '../../assets/person1.jpg';
import person2 from '../../assets/person2.jpg';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import Moment from 'react-moment';

import { BsChatDots, BsThreeDots, BsBookmarks } from 'react-icons/bs';
import { BiHappyAlt } from 'react-icons/bi';
import PostAdd from './PostAdd';

const Posts = [
  {
    userName: 'Ayush',
    userImage: person1,
    name: 'Ayush',
    date: 'March 1, 10:09 PM',
    caption: 'Some clicks of todays tour of Nepal',
    image: person1,
    isLiked: false,
    comments: [{ userName: 'Avishek', userImage: person2, comment: 'Nice' }],
    // likes:[{}]
  },
];

const Feed = () => {
  const [comment, setComment] = React.useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='col-span-6'>
        {showModal && <PostAdd onSetShowModal={setShowModal} />}
        {/* Whats on your mind section */}
        <div className='bg-white rounded-[20px] px-6 pt-4 pb-20 flex gap-x-2  max-h-[176px] '>
          <img
            src={person1}
            alt='Profile'
            className='h-10 w-10 rounded-full object-cover'
          />
          <textarea
            rows={1}
            className='focus:outline-none bg-[#F1F1F1] rounded-[27px] p-4 w-full resize-none cursor-pointer'
            placeholder=' Whats on your mind Ayush?'
            value={null}
            onClick={() => setShowModal(true)}
          />
        </div>

        {/* posts  */}
        <>
          {Posts?.map((post) => {
            return (
              <div className='bg-white my-7 border rounded-md'>
                {/* Post Header */}
                <div className='flex items-center p-5'>
                  <img
                    className='h-12 w-12 rounded-full object-cover border p-1 mr-3'
                    src={post.userImage}
                    alt={post.userName}
                  />
                  <h3 className='font-bold flex-1'>{post.username}</h3>

                  <BsThreeDots className='h-5 cursor-pointer' />
                </div>
                {/* Post Image */}
                <div className='py-5'>
                  <img
                    className='w-full object-cover'
                    src={post.image}
                    alt={post.caption}
                  />
                </div>
                {/* Post Buttons */}
                {/* {session?.user && ( */}
                <div className='flex justify-between items-center px-4 pt-4'>
                  <div className='flex space-x-4'>
                    {post?.isLiked ? (
                      <AiFillHeart
                        className='btn-icon text-red-400'
                        // onClick={likePost}
                      />
                    ) : (
                      <AiOutlineHeart
                        className='btn-icon'
                        // onClick={likePost}
                      />
                    )}
                    <BsChatDots className='btn-icon' />
                  </div>
                  <BsBookmarks className='btn-icon' />
                </div>
                {/* )} */}
                {/* Post Comments */}
                <div className='p-5 truncate'>
                  {post?.likes?.length > 0 && (
                    <p className='font-bold mb-1'>
                      {post?.likes?.length}{' '}
                      {post?.likes?.length === 1 ? 'like' : 'likes'}
                    </p>
                  )}
                  <span className='font-bold mr-2'>{post?.userName}</span>
                  {post.caption}
                </div>
                {post?.comments.length > 0 && (
                  <div className='mx-10 max-h-24 overflow-y-auto scrollbar-none'>
                    {post?.comments.map((comment, i) => {
                      return (
                        <div
                          className='flex items-center space-x-2 mb-2'
                          key={i}
                        >
                          <img
                            alt='userImage'
                            src={comment?.userImage}
                            className='h-7 w-7 rounded-full object-cover'
                          />
                          <p className='font-semibold'>{comment?.userName}</p>
                          <p className='flex-1 truncate'>{comment?.comment}</p>
                          <Moment fromNow>
                            {comment?.timestamp?.toDate()}
                          </Moment>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* post input box */}
                {/* {session?.user && ( */}
                <form className='flex items-center p-4'>
                  <BiHappyAlt className='text-2xl' />
                  <input
                    type='text'
                    placeholder='Enter your comment...'
                    className='flex-1 border-none focus:ring-0 focus:outline-none'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type='submit'
                    className='text-blue-400 font-bold disabled:text-blue-200'
                    disabled={!comment.trim()}
                    // onClick={sendComment}
                  >
                    Comment
                  </button>
                </form>
                {/* )} */}
              </div>
            );
          })}
        </>
      </div>
    </>
  );
};

export default Feed;
