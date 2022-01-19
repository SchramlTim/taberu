import React from 'react';

class Register extends React.Component {

    state = {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        paypalUsername: '',
    };

    constructor(props: any) {
      super(props);  
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
      this.handleChangeLastName = this.handleChangeLastName.bind(this);
      this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
      this.handleChangePaypalUsername = this.handleChangePaypalUsername.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUsername(event: any) {
      this.setState({username: event.target.value});
    }

    handleChangePassword(event: any) {
        this.setState({password: event.target.value});
    }

    handleChangeFirstName(event: any) {
      this.setState({firstName: event.target.value});
    }

    handleChangeLastName(event: any) {
        this.setState({lastName: event.target.value});
    }

    handleChangePhoneNumber(event: any) {
      this.setState({phoneNumber: event.target.value});
    }

    handleChangePaypalUsername(event: any) {
        this.setState({paypalUsername: event.target.value});
    }
  
    handleSubmit(event: any) {
      this.postData("https://taberu.localhost/v1/users/register", { 
          username: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
          paypalUsername: this.state.paypalUsername,
        })
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
 
        event.preventDefault();
    }

    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
  
    render() {
      return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <form onSubmit={this.handleSubmit} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="username">
                            Name
                        </label>
                        <input
                            onChange={this.handleChangeUsername}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="username" type="text" placeholder="Name"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            onChange={this.handleChangeFirstName}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="firstName" type="text" placeholder="First Name"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            onChange={this.handleChangeLastName}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="lastName" type="text" placeholder="Last Name"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={this.handleChangePassword}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="password" type="password" placeholder="*****************"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            onChange={this.handleChangePhoneNumber}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="phoneNumber" type="tel" placeholder="*****************"/>
                    </div>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="paypalUsername">
                            Paypal Username
                        </label>
                        <input
                            onChange={this.handleChangePaypalUsername}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="paypalUsername" type="email" placeholder="max.mustermann@email.com"/>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <button
                            className={'bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                            type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
      );
    }
  }


export default Register;