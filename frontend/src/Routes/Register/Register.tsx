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
        <form onSubmit={this.handleSubmit} className={'grid justify-around'}>
          <label htmlFor="username">Name:</label>
          <input name="username" type="text" onChange={this.handleChangeUsername} />

          <label htmlFor="firstName">First Name:</label>
          <input name="firstName" type="text" onChange={this.handleChangeFirstName} />

          <label htmlFor="lastName">Last Name:</label>
          <input name="lastName" type="text" onChange={this.handleChangeLastName} />

          <label htmlFor="password">Password:</label>
          <input name="password" type="password" onChange={this.handleChangePassword} />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input name="phoneNumber" type="text" onChange={this.handleChangePhoneNumber} />

          <label htmlFor="paypalUsername">Paypal Username:</label>
          <input name="paypalUsername" type="text" onChange={this.handleChangePaypalUsername} />
          
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }


export default Register;