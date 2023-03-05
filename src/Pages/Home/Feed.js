import React, { useEffect, useState } from 'react';
import person1 from '../../assets/person1.jpg';
import person2 from '../../assets/person2.jpg';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import Moment from 'react-moment';

import { BsChatDots, BsThreeDots, BsBookmarks } from 'react-icons/bs';
import { BiHappyAlt } from 'react-icons/bi';
import PostAdd from './PostAdd';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Post from './Post';

// const Posts = [
//   {
//     userName: 'Ayush',
//     userImage: person1,
//     name: 'Ayush',
//     date: 'March 1, 10:09 PM',
//     caption: 'Some clicks of todays tour of Nepal',
//     image: person1,
//     isLiked: false,
//     comments: [{ userName: 'Avishek', userImage: person2, comment: 'Nice' }],
//     // likes:[{}]
//   },
// ];

const Feed = () => {
  const [showModal, setShowModal] = useState(false);

  const [posts, setPosts] = React.useState([]);
  console.log('🚀 ~ file: Feed.js:34 ~ Feed ~ posts:', posts);

  useEffect(() => {
    const unsubcribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubcribe;
  }, []);

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
            onClick={() => setShowModal(true)}
          />
        </div>

        {/* posts  */}
        <>
          {posts?.map((post) => {
            const postData = {
              id: post?.id,
              userName: post?.data()?.userName,
              userImg: post?.data()?.profileImg,
              img: post?.data()?.image,
              caption: post?.data()?.caption,
            };

            return <Post post={postData} />;
          })}
        </>
      </div>
    </>
  );
};

export default Feed;
