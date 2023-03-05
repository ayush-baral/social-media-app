import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiHappyAlt } from 'react-icons/bi';
import { BsBookmarks, BsChatDots, BsThreeDots } from 'react-icons/bs';
import Moment from 'react-moment';
import person1 from '../../assets/person1.jpg';

const Post = ({ post }) => {
  console.log('🚀 ~ file: Post.js:8 ~ Post ~ post:', post);
  const [comment, setComment] = React.useState('');

  return (
    <div className='bg-white my-7 border rounded-md'>
      {/* Post Header */}
      <div className='flex items-center p-5 justify-between'>
        <div className='flex items-center gap-x-2'>
          <img
            className='h-12 w-12 rounded-full object-cover border p-1 mr-3'
            src={post.userImg || person1}
            alt={post.userName}
          />
          <h3 className='font-bold flex-1'>{post.userName}</h3>
        </div>

        <BsThreeDots className='h-5 cursor-pointer' />
      </div>

      <span className='px-5'>{post?.caption}</span>

      {/* Post Image */}
      {/* {post?.image && ( */}
      <div className='py-5'>
        <img
          className='w-full object-cover'
          src={post.image || person1}
          alt={post.caption}
        />
      </div>
      {/* )} */}

      {/* Post Comments */}
      {post?.likes?.length > 0 && (
        <div className='p-5 truncate'>
          <p className='font-bold mb-1'>
            {post?.likes?.length} {post?.likes?.length === 1 ? 'like' : 'likes'}
          </p>
        </div>
      )}

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

      {post?.comments?.length > 0 && (
        <div className='mx-10 max-h-24 overflow-y-auto scrollbar-none'>
          {post?.comments.map((comment, i) => {
            return (
              <div className='flex items-center space-x-2 mb-2' key={i}>
                <img
                  alt='userImage'
                  src={comment?.userImage}
                  className='h-7 w-7 rounded-full object-cover'
                />
                <p className='font-semibold'>{comment?.userName}</p>
                <p className='flex-1 truncate'>{comment?.comment}</p>
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
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
};

export default Post;
