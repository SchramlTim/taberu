import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

function BowlDetails() {
    const [display, setDisplayState] = useState<any>(false);    
    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
      }, [display])
    return (
        <>
            <div className={'bg-amber-600 h-16 flex items-center'}>
                <button className={'absolute right-2 z-50 bg-white h-12 w-20 rounded-2xl flex justify-center items-center'} onClick={toggleMenu}>
                    <div>Öffnen</div>
                </button>
                {display &&
                <div className={'absolute right-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 bg-gray-800 border border-gray-200 h-screen top-0 m-0 w-1/4'}>
                    <ul className={'mt-20 flex flex-col justify-start text-center'}>
                        <li className={'mt-2'}><Link to="/login">Login</Link></li>
                        <li className={'mt-2'}><Link to="/register">Register</Link></li>
                        <li className={'mt-2'}><Link to="/user">Users</Link></li>
                        <li className={'mt-2'}><Link to="/bowls">Bowls</Link></li>
                    </ul>
                </div>}
            </div>
        </>
      );
  }

export default BowlDetails;