import React from 'react';
import Header from '../../Components/Header/Header';

const DefaultLayout = ({children}: any) => (
  <div className={'h-screen w-screen font-quicksand'}>
    <Header />
    <div className={'mt-10'}>
      {children}
    </div>
  </div>
);

export {DefaultLayout};
