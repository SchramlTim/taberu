import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
//import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
      return (
        <>
          <h1>Home</h1>
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/register">Register</Link></p>
          <p><Link to="/user">Users</Link></p>
          <p className={"bg-amber-700"}><Link to="/bowls">Bowls</Link></p>
        </>
      );
    }
  }


export default Home;