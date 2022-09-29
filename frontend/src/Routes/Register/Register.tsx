import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Input/Input";
import {validateEmail, validateNotEmpty} from "../../Utils/Validator";

function Register() {

    const [afterRegister, setAfterRegister] = useState(false)

    if (afterRegister) {
        return (<Redirect to={'/login'} />)
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <Form name={'login'} method={'POST'} action={process.env.REACT_APP_API_ENDPOINT + "/v1/users/register"} afterSubmit={() => setAfterRegister(true)} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <Input identifier={'username'} title={'Name*'} placeholder={''} validation={validateEmail}/>
                    <Input identifier={'firstName'} title={'First Name*'} placeholder={''} validation={validateNotEmpty}/>
                    <Input identifier={'lastName'} title={'Last Name*'} placeholder={''} validation={validateNotEmpty}/>
                    <Input identifier={'password'} title={'Password*'} placeholder={'*****************'} type={'password'} validation={(event) => {}}/>
                    <Input identifier={'phoneNumber'} title={'Phone Number (optional)'} placeholder={''} validation={(event) => {}}/>
                    <Input identifier={'paypalUsername'} title={'Paypal Username (optional)'} placeholder={''} validation={(event) => {}}/>
                    <div className={'flex items-center justify-between'}>
                        <Button type={'submit'} text={'Sign Up'}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;