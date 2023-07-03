import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { UserContext } from '../../Context/UserContext'

type ButtonTypes = 'button' | 'submit' | 'reset' | undefined

function NavigationMenu(props: { toggleMenu: () => any }) {
    const { user: userContext, logout } = useContext(UserContext)

    const handleLogout = () => {
        logout()
        props.toggleMenu()
    }

    return (
        <>
            <ul className={'flex flex-col justify-start text-center text-2xl'}>
                {userContext && (
                    <>
                        {
                            //<li className={'mt-2'}><Link onClick={props.toggleMenu} to="/user">Users</Link></li>
                            <li className={'mt-2'}>
                                <Link onClick={props.toggleMenu} to="/bowls">
                                    Bowls
                                </Link>
                            </li>
                            //<li className={'mt-2'}><Link onClick={props.toggleMenu} to="/menus">Menus</Link></li>
                        }
                    </>
                )}
                {!userContext && (
                    <>
                        <li className={'mt-2'}>
                            <Link onClick={props.toggleMenu} to="/login">
                                Login
                            </Link>
                        </li>
                        <li className={'mt-2'}>
                            <Link onClick={props.toggleMenu} to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            {userContext && (
                <div className={'absolute bottom-12 w-full'}>
                    <div
                        className={
                            'flex flex-col justify-start gap-2 text-lg p-4'
                        }
                    >
                        <span>
                            Hi, {userContext.firstName} {userContext.lastName}
                        </span>
                        <span className={'text-base'}>
                            User: {userContext.username}
                        </span>
                        <span className={'text-base'}>
                            ID: {userContext.id}
                        </span>
                        <Button
                            variant="secondary"
                            type={'button'}
                            text={'Logout'}
                            onClick={handleLogout}
                        ></Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavigationMenu
