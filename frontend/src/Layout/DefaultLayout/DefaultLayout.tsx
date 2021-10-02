import React from 'react';
import styles from './DefaultLayout.module.css';
import Header from '../../Components/Header/Header';

const DefaultLayout = ({children}: any) => (
  <>
    <Header />
    <div className={styles.contentSection}>
      {children}
    </div>
  </>
);

export {DefaultLayout};
