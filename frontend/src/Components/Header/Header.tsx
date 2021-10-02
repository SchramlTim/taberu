import React, { useState, useCallback } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
//import { Link } from "react-router-dom";

function BowlDetails() {
    const [display, setDisplayState] = useState<any>(false);    
    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
      }, [display])
    return (
        <>
            <div className={styles.header}>
                <div className={styles.menuButton} onClick={toggleMenu}>Öffnen</div>
                {display &&
                <div className={styles.menu}>
                <ul >
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/user">Users</Link></li>
                    <li><Link to="/bowls">Bowls</Link></li>
                </ul></div>}
            </div>
        </>
      );
  }

export default BowlDetails;