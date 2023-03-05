import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import person1 from '../../assets/person1.jpg';
import { removeState } from '../../Utils/helper';
import { accessToken } from '../../Utils/names';

const Profile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const menuData = [
    { name: 'Profile', type: 'link', path: '/profile' },
    {
      name: 'Logout',
      type: 'function',
      onClick: () => {
        removeState(accessToken);
        navigate('/signin');
      },
    },
  ];

  const showMenuHandler = () => {
    setShowMenu(true);
  };
  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <div className='pt-3'>
      <div className='relative'>
        <img
          src={person1}
          alt='profile'
          className='h-[44px] w-[44px] rounded-full cursor-pointer object-cover'
          onMouseEnter={showMenuHandler}
          // onMouseLeave={hideMenuHandler}
        />

        {showMenu && (
          <div
            className='absolute  top-[44px] right-3 bg-white flex flex-col gap-y-2  border border-[#f1f1f1]'
            onMouseEnter={showMenuHandler}
            onMouseLeave={hideMenuHandler}
          >
            {menuData?.map((item, i) => {
              return (
                <div
                  key={i}
                  className=' [&:not(:last-child)]:border-b-2 border-gray-300 px-10 py-2 cursor-pointer'
                  onClick={() =>
                    item?.type === 'link'
                      ? navigate(item?.path)
                      : item?.onClick()
                  }
                >
                  {item?.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
