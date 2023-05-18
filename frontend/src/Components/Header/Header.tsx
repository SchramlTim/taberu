import React, {useState, useCallback, useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from "../../Context/UserContext";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";
import NavigationMenu from "../NavigationMenu/NavigationMenu";

function Header() {

    const [display, setDisplayState] = useState(false);

    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
      }, [display])

    return (
        <>
            <header className={'h-16 flex justify-center items-center bg-clip-padding bg-transparent'}>
                <Popup toggle={toggleMenu} display={display}>
                    <NavigationMenu toggleMenu={toggleMenu} />
                </Popup>
                <button className={'absolute left-2 z-10 bg-transparent h-12 w-12 rounded-2xl flex justify-center items-center'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                </button>
                <button className={'absolute right-2 z-10 bg-transparent h-12 w-12 rounded-2xl flex justify-center items-center'} onClick={toggleMenu}>
                    <div className="space-y-2">
                        <div className="w-8 h-0.5 bg-text-primary"></div>
                        <div className="w-5 h-0.5 bg-text-primary"></div>
                        <div className="w-3 h-0.5 bg-text-primary"></div>
                    </div>
                </button>
            </header>
        </>
      );
  }

export default Header;