import React, { useState, useEffect } from 'react';
import {get} from "../../Utils/Request";

function User() {

    const [user, setUser] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        get(process.env.API_ENDPOINT + "/v1/users/")
            .then(response => {
                setUser(response.data)
            });
    }, []);

      return (
          <ul className={"bg-light"}>
              {
                  user.map((userObject: any) => (
                  <li key={userObject.id}>
                      <span>{userObject.username}</span>
                  </li>
              ))}
          </ul>

      );
  }

export default User;