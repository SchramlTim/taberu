import React from 'react';
import styles from './DefaultLayout.module.css';

const DefaultLayout = ({children}: any) => (
  <>
    <div className={styles.contentSection}>
      {children}
    </div>
  </>
);

export {DefaultLayout};
