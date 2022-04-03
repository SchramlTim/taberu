import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../Context/UserContext';

export const Login = () => {

    const { user: userContext, login } = useContext(UserContext);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [afterLogin, setAfterLogin] = useState(false);

    const postData = async (url = '', data = {}) => {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await postData("https://taberu.localhost/v1/users/login", {
            username: user,
            password: password,
        });

        login(response.data)
        setAfterLogin(true)
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <form onSubmit={handleSubmit} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="username">
                            Username
                        </label>
                        <input
                            onChange={({currentTarget}) => setUser(currentTarget.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="username" type="text" placeholder="Username"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={({currentTarget}) => setPassword(currentTarget.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="password" type="password" placeholder="*****************"/>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <button
                            className={'bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                            type="submit">
                            Sign In
                        </button>
                        <a className={'inline-block align-baseline font-bold text-sm text-amber-500 hover:text-amber-800'} href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;