import React, {useState} from 'react';
import { post } from "../../Utils/Request";
import { Redirect } from "react-router-dom";
import Button from "../../Components/Button/Button";

function Register() {

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [paypalUsername, setPaypalUsername] = useState('')
    const [afterRegister, setAfterRegister] = useState(false)

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        try {
            const response = await post(process.env.REACT_APP_API_ENDPOINT + "/v1/users/register", {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
                phoneNumber: phoneNumber,
                paypalUsername: paypalUsername,
            })
            setAfterRegister(true)
        } catch (e) {
            console.log(e)
        }
    }

    if (afterRegister) {
        return (<Redirect to={'/login'} />)
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <form onSubmit={handleSubmit} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="username">
                            Name
                        </label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="username" type="text" placeholder="Name"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="firstName" type="text" placeholder="First Name"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="lastName" type="text" placeholder="Last Name"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="password" type="password" placeholder="*****************"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="phoneNumber" type="tel" placeholder="00000-00000"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="paypalUsername">
                            Paypal Username
                        </label>
                        <input
                            onChange={(e) => setPaypalUsername(e.target.value)}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="paypalUsername" type="email" placeholder="max.mustermann@email.com"/>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <Button type={'submit'} text={'Sign Up'} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;