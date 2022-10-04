import React, {useState, useCallback, useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from "../../Context/UserContext";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";

function Header() {

    const { user: userContext, logout } = useContext(UserContext)
    const [display, setDisplayState] = useState<any>(false);

    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
        // @ts-ignore
        document.body.style.overflow = !display ? 'hidden' : 'scroll';
      }, [display])

    const handleLogout = () => {
        logout()
        toggleMenu()
    }

    return (
        <>
            <header className={'h-16 flex justify-center items-center bg-clip-padding bg-transparent'}>
                <Popup toggle={toggleMenu} display={display}>
                        <ul className={'mt-20 flex flex-col justify-start text-center text-2xl'}>
                            {userContext &&
                                <>
                                    <li className={'mt-2'}><Link onClick={toggleMenu} to="/user">Users</Link></li>
                                    <li className={'mt-2'}><Link onClick={toggleMenu} to="/bowls">Bowls</Link></li>
                                    <li className={'mt-2'}><Link onClick={toggleMenu} to="/menus">Menus</Link></li>
                                </>
                            }
                            {!userContext &&
                                <>
                                    <li className={'mt-2'}><Link onClick={toggleMenu} to="/login">Login</Link></li>
                                    <li className={'mt-2'}><Link onClick={toggleMenu} to="/register">Register</Link></li>
                                </>
                            }
                        </ul>
                        {userContext &&
                            <div className={'absolute bottom-12 w-full'}>
                                <div className={'flex flex-col justify-start gap-2 text-lg p-4'}>
                                    <span>Hi, {userContext.firstName} {userContext.lastName}</span>
                                    <span className={'text-base'}>User: {userContext.username}</span>
                                    <span className={'text-base'}>ID: {userContext.id}</span>
                                    <Button type={'button'} text={'Logout'} onClick={handleLogout}></Button>
                                </div>
                            </div>
                        }
                </Popup>
                <button className={'absolute text-gray-600 left-2 z-50 bg-transparent h-12 w-12 rounded-2xl flex justify-center items-center'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                </button>
                <button className={'absolute right-2 z-50 bg-transparent h-12 w-12 rounded-2xl flex justify-center items-center'} onClick={toggleMenu}>
                    <div className="space-y-2">
                        <div className="w-8 h-0.5 bg-gray-600"></div>
                        <div className="w-5 h-0.5 bg-gray-600"></div>
                        <div className="w-3 h-0.5 bg-gray-600"></div>
                    </div>
                </button>
            </header>
        </>
      );
  }

export default Header;