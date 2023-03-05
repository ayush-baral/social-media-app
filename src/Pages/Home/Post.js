import { onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiHappyAlt } from 'react-icons/bi';
import { BsBookmarks, BsChatDots, BsThreeDots } from 'react-icons/bs';
import Moment from 'react-moment';
import person1 from '../../assets/person1.jpg';
import { auth, db } from '../../firebase';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState(null);
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([]);

  // setting user if user changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  });

  // fetch like detail
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot) => {
        setLikes(snapshot?.docs);
      }
    );
    return unsubscribe;
  }, [post?.id]);

  // fetch comment detail
  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(
        collection(db, 'posts', post.id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return unSubscribe;
  }, [post.id]);

  // When user likes a post this function is called
  async function likePostHandler() {
    if (isLiked) {
      // runs if user has already liked the post
      await deleteDoc(doc(db, 'posts', post.id, 'likes', user?.email));
    } else {
      // runs if user hasn't liked the post
      await setDoc(doc(db, 'posts', post.id, 'likes', user?.email), {
        username: user?.email,
      });
    }
  }

  // checking if user has liked the post
  useEffect(() => {
    likes.findIndex((like) => like.id === user?.email) === -1
      ? setIsLiked(false)
      : setIsLiked(true);
  }, [likes, user?.email]);

  // this function is called on commenting on a post
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', post.id, 'comments'), {
      comment: commentToSend,
      userName: user?.displayName,
      userImage: user?.photoURL,
      timestamp: serverTimestamp(),
    });
  };

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

      {/* Post Likes */}
      {likes?.length > 0 && (
        <div className='px-5 py-1 truncate'>
          <p className='font-bold mb-1'>
            {likes?.length} {likes?.length === 1 ? 'like' : 'likes'}
          </p>
        </div>
      )}

      {/* Post Buttons */}
      <div className='flex justify-between items-center px-4 pt-4'>
        <div className='flex space-x-4'>
          {isLiked ? (
            <AiFillHeart
              className='btn-icon text-red-400'
              onClick={likePostHandler}
            />
          ) : (
            <AiOutlineHeart className='btn-icon' onClick={likePostHandler} />
          )}
          <BsChatDots className='btn-icon' />
        </div>
        <BsBookmarks className='btn-icon' />
      </div>

      {comments?.length > 0 && (
        <div className='comment-section'>
          <div className='m-5 max-h-28 overflow-y-auto scrollbar-none '>
            {comments.map((comment, i) => {
              return (
                <div className='flex items-center space-x-2 mb-2' key={i}>
                  <img
                    alt='userImage'
                    src={comment?.userImage || person1}
                    className='h-7 w-7 rounded-full object-cover'
                  />
                  <p className='font-semibold'>{comment?.data()?.userName}</p>
                  <p className='flex-1 truncate'>{comment?.data()?.comment}</p>
                  <Moment fromNow>
                    {comment?.data()?.timestamp?.toDate()}
                  </Moment>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* post input box */}
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
          onClick={sendComment}
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default Post;
