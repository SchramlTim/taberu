import React from 'react';
import { Redirect } from 'react-router';

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        afterLogin: false
    };

    constructor(props: any) {
      super(props);  
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUsername(event: any) {
      this.setState({username: event.target.value});
    }

    handleChangePassword(event: any) {
        this.setState({password: event.target.value});
      }
  
    handleSubmit(event: any) {
      this.postData("https://taberu.localhost/v1/users/login", { 
          username: this.state.username,
          password: this.state.password,
        })
        .then(response => {
            sessionStorage.setItem('token', response.data.token);
            this.setState({afterLogin: true});
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

      if (this.state.afterLogin) {
        return (<Redirect to="/"/>);
      }

      return (
      <div className={'flex justify-center items-center w-full h-full'}>
          <div className={'w-full max-w-xs'}>
            <form onSubmit={this.handleSubmit} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                <div className={'mb-4'}>
                    <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="username">
                        Username
                    </label>
                    <input
                        onChange={this.handleChangeUsername}
                        className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                        id="username" type="text" placeholder="Username"/>
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
  }


export default Login;