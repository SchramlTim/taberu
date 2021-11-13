import React from 'react';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
//import { Link } from "react-router-dom";
import '../../index.css'

export const Home = () => {
      return (
        <div className={"my-50"}>
          <h1 className={"bg-light"}>Home</h1>
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/register">Register</Link></p>
          <p><Link to="/user">Users</Link></p>
          <p><Link to="/bowls">Bowls</Link></p>
          <p className={"m-5 text-red-300"}><Link to="/bowls">Bowls</Link></p>
        </div>
      );
  }


export default Home;