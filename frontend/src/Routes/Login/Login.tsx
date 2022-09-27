import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../Context/UserContext';
import { Redirect } from "react-router-dom";
import { post } from '../../Utils/Request'
import Button from "../../Components/Button/Button";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Input/Input";



export const Login = () => {

    const { user: userContext, login } = useContext(UserContext);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [afterLogin, setAfterLogin] = useState(false);

    const loginUser = async (response: Response) => {
        const user = await response.json()
        login(user.data)
        setAfterLogin(true)
    }

    if (afterLogin) {
        return (<Redirect to={'/bowls'}/>)
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <Form name={'login'} method={'POST'} action={process.env.REACT_APP_API_ENDPOINT + "/v1/users/login"} afterSubmit={loginUser} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <Input identifier={'username'} title={'Username'} placeholder={''} onBlur={(event) => {}}/>
                    <Input identifier={'password'} title={'Password'} placeholder={'*****************'} type={'password'} onBlur={(event) => {}}/>
                    <div className={'flex items-center justify-between'}>
                        <Button type={'submit'} text={'Sign In'}/>
                        <a className={'inline-block align-baseline font-bold text-sm text-primary'} href="#">
                            Forgot Password?
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;