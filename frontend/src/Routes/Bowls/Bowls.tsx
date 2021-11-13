import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './User.module.css';
//import { Link } from "react-router-dom";

type BowlProps = {
    id: string,
    name: string,
    description: string,
    orderDeadline: string,
    arriveDate: string,
}

export const Bowls = () => {

    const [bowls, setBowls] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getData("https://taberu.localhost/v1/bowls/")
            .then(response => {
                setBowls(response.data)
        });
    }, []);

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
                  bowls.map((bowl: BowlProps) => (
                    <Link key={bowl.id} to={'/bowls/' + bowl.id}>
                        <li key={bowl.id}>
                            <p>{bowl.name}</p>
                            <p>{bowl.description}</p>
                            <p>{bowl.orderDeadline}</p>
                            <p>{bowl.arriveDate}</p>
                        </li>
                    </Link>
              ))}
          </ul>
      );
  }

export default Bowls;