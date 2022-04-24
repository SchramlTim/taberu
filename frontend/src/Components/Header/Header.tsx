import React, {useState, useCallback, useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from "../../Context/UserContext";

function Header() {
    const [display, setDisplayState] = useState<any>(false);    
    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
      }, [display])
    const { user: userContext, logout } = useContext(UserContext)
    const handleLogout = () => {
        logout()
        toggleMenu()
    }
    return (
        <>
            <header className={'h-16 flex items-center bg-clip-padding backdrop-filter backdrop-blur-xl bg-primary shadow'}>
                <Link to="/" className={'text-xl'}>Taberu</Link>

                <button className={'absolute right-2 z-50 bg-white h-12 w-12 rounded-2xl flex justify-center items-center'} onClick={toggleMenu}>
                    <div className="space-y-2">
                        <div className="w-8 h-0.5 bg-gray-600"></div>
                        <div className="w-8 h-0.5 bg-gray-600"></div>
                        <div className="w-8 h-0.5 bg-gray-600"></div>
                    </div>
                </button>
                {display &&
                <>
                    <div onClick={toggleMenu} className={'absolute top-0 left-0 w-screen h-screen'}></div>
                    <div className={'absolute right-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 bg-gray-800 border h-screen border-gray-200 top-0 m-0 w-3/4 md:w-1/4 sm:w-1/2 lg:w-1/5 text-white'}>
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
                                <div className={'flex flex-col justify-start text-lg p-4'}>
                                    <span>Hi, {userContext.firstName} {userContext.lastName}</span>
                                    <span className={'text-base'}>User: {userContext.username}</span>
                                    <span className={'text-base'}>ID: {userContext.id}</span>
                                    <div className={'p-2 mt-2 text-center rounded-md bg-gray-900'} onClick={handleLogout}>Logout</div>
                                </div>
                            </div>
                        }
                    </div>
                </>}
            </header>
        </>
      );
  }

export default Header;