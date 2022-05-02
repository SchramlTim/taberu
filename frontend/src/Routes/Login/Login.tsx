import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../Context/UserContext';
import { Redirect } from "react-router-dom";
import { post } from '../../Utils/Request'
import Button from "../../Components/Button/Button";

export const Login = () => {

    const { user: userContext, login } = useContext(UserContext);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [afterLogin, setAfterLogin] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await post("https://taberu.localhost/v1/users/login", {
                username: user,
                password: password,
            });

            login(response.data)
            setAfterLogin(true)
        } catch (e) {
            console.log(e)
        }
    }

    if (afterLogin) {
        return (<Redirect to={'/bowls'}/>)
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
                        <Button type={'submit'} text={'Sign In'} />
                        <a className={'inline-block align-baseline font-bold text-sm text-primary'} href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;