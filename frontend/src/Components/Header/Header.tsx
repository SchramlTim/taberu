import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

function BowlDetails() {
    const [display, setDisplayState] = useState<any>(false);    
    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
      }, [display])
    return (
        <>
            <div className={'bg-amber-600 h-16'}>
                <div className={'absolute right-2 z-50 bg-white h-12 w-12'} onClick={toggleMenu}>Öffnen</div>
                {display &&
                <div className={'absolute right-0 bg-red-700 h-screen top-0 m-0 w-1/4'}>
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