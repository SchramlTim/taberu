import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {get} from "../../Utils/Request";
import {BowlProps} from "../../Utils/Types";
import BowlListItem from "./BowlListItem/BowlListItem";

export const Bowls = () => {

    const [bowls, setBowls] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/bowls?filter[orderDeadline]=" + (new Date()).toISOString())
            .then(response => {
                setBowls(response.data)
        });
    }, []);

      return (
          <>
              <div className={"flex flex-col gap-y-3 justify-center items-center"}>
                  {
                      bowls.map((bowl: BowlProps) => (
                        <BowlListItem key={bowl.id} {...bowl} />
                  ))}
              </div>
              <Link to="/bowls/create" className="bg-button-primary fixed bottom-10 right-10 text-black text-center py-2 px-4 rounded h-14 w-14 inline-flex items-center">
                  <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
              </Link>
          </>
      );
}

export default Bowls;
