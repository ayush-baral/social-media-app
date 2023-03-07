import React from 'react';
import Header from '../../Components/Header';
import DetailAndContact from './DetailAndContact';
import Feed from './Feed';

const Index = () => {
  return (
    <div className='bg-[#f1f1f1] min-h-screen'>
      <Header />

      <div className='mt-7 gap-x-[50px] gap-y-5 grid grid-cols-12 ml-6 mr-[60px]'>
        <DetailAndContact />
        <Feed />
      </div>
    </div>
  );
};

export default Index;
