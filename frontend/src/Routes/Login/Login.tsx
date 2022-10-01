import React, {useContext, useState} from 'react';
import { UserContext } from '../../Context/UserContext';
import { Redirect } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Input/Input";
import {validateEmail, validateNotEmpty} from "../../Utils/Validator";
import {FormProvider} from "../../Context/FormContext";



export const Login = () => {

    const { user: userContext, login } = useContext(UserContext);
    const [afterLogin, setAfterLogin] = useState(false);

    const loginUser = async (response: Response) => {
        const user = await response.json()
        login(user.data)
        setAfterLogin(true)
    }

    if (afterLogin || userContext) {
        return (<Redirect to={'/bowls'}/>)
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <FormProvider>
                    <Form name={'login'} method={'POST'} action={process.env.REACT_APP_API_ENDPOINT + "/v1/users/login"} afterSubmit={loginUser} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                        <Input identifier={'username'} title={'Username'} autocomplete={'email'} placeholder={''} validation={(input) => {
                            validateNotEmpty(input)
                            validateEmail(input)
                        }}/>
                        <Input identifier={'password'} title={'Password'} autocomplete={'current-password'} placeholder={'*****************'} type={'password'} validation={(input) => {}}/>
                        <div className={'flex items-center justify-between gap-4'}>
                            <Button type={'submit'} text={'Sign In'}/>
                            <a className={'inline-block align-baseline font-bold text-sm text-primary'} href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </Form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Login;