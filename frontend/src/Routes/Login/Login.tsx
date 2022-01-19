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
        <form onSubmit={this.handleSubmit} className={'grid justify-around'}>
          <label htmlFor="username">Name:</label>
          <input name="username" type="text" onChange={this.handleChangeUsername} />

          <label htmlFor="password">Password:</label>
          <input name="password" type="password" onChange={this.handleChangePassword} />
          
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }


export default Login;