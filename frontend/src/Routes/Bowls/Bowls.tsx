import React, { useState, useEffect } from 'react';
import BowlListElement from "../../Components/BowlListElement/BowlListElement";

export type BowlProps = {
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
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'x-token': sessionStorage.getItem('token') ?? ''
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

      return (
          <div className={"flex flex-col gap-y-3 justify-center items-center"}>
              {
                  bowls.map((bowl: BowlProps) => (
                    <BowlListElement  {...bowl} />
              ))}
          </div>
      );
  }

export default Bowls;