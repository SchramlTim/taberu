import React from 'react';
import Header from '../../Components/Header/Header';

const DefaultLayout = ({children}: any) => (
  <>
    <Header />
    <div className={'mt-10'}>
      {children}
    </div>
  </>
);

export {DefaultLayout};
