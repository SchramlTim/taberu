import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Input/Input";
import {validateContainsSpecialCharacter, validateEmail, validateLength, validateNotEmpty} from "../../Utils/Validator";
import {FormProvider} from "../../Context/FormContext";

function Register() {

    const [afterRegister, setAfterRegister] = useState(false)

    if (afterRegister) {
        return (<Redirect to={'/login'} />)
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <FormProvider>
                    <Form name={'login'} method={'POST'} action={process.env.REACT_APP_API_ENDPOINT + "/v1/users/register"} afterSubmit={() => setAfterRegister(true)} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                        <Input identifier={'username'} title={'Name'} required autocomplete={'email'} placeholder={''} validation={(input) => {
                            validateNotEmpty(input)
                            validateEmail(input)
                        }}/>
                        <Input identifier={'firstName'} title={'First Name'} required autocomplete={'given-name'} placeholder={''} validation={(input) => {
                            validateNotEmpty(input)
                        }}/>
                        <Input identifier={'lastName'} title={'Last Name'} required autocomplete={'family-name'} placeholder={''} validation={(input) => {
                            validateNotEmpty(input)
                        }}/>
                        <Input identifier={'password'} title={'Password'} required autocomplete={'new-password'} placeholder={'*****************'} type={'password'} validation={(input) => {
                            validateNotEmpty(input)
                            validateContainsSpecialCharacter(input)
                            validateLength(input, 6)
                        }}/>
                        <Input identifier={'phoneNumber'} title={'Phone Number (optional)'} autocomplete={'tel'} placeholder={''} validation={(event) => {}}/>
                        <Input identifier={'paypalUsername'} title={'Paypal Username (optional)'} placeholder={''} validation={(event) => {}}/>
                        <div className={'flex items-center justify-between'}>
                            <Button type={'submit'} text={'Sign Up'}/>
                        </div>
                    </Form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Register;