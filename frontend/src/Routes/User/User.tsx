import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import styles from './User.module.css';
//import { Link } from "react-router-dom";

function User() {

    const [user, setUser] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getData("https://taberu.localhost/v1/users/")
            .then(response => {
                setUser(response.data)
            });
    });

    const getData = async (url = '', data = {}) => {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('Accept', 'application/json');
        requestHeaders.set('x-token', sessionStorage.getItem('token') as string);
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: requestHeaders,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

      return (
          <ul className={"bg-light"}>
              {
                  user.map((userObject) => (
                  <li key={userObject}>
                      {JSON.stringify(userObject)}
                  </li>
              ))}
          </ul>

      );
  }

export default User;