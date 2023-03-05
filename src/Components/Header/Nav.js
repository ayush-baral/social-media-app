import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const NAVBAR_LINKS = [
  { name: 'Home', link: '/' },
  { name: 'Profile', link: '/profile' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='flex gap-x-[76px] pt-[26px]'>
      {NAVBAR_LINKS?.map((link) => {
        return (
          <p
            className={`cursor-pointer border-b-[6px] border-[#F1F1F1] pb-[14px] ${
              location?.pathname === link?.link ? '!border-[#2D68FE]' : ''
            }`}
            onClick={() => navigate(link?.link)}
          >
            {link?.name}
          </p>
        );
      })}
    </div>
  );
};

export default Navbar;
