import React, {useState, useEffect, Suspense} from 'react';
import { Link } from 'react-router-dom';
import {get} from "../../Utils/Request";
import {BowlProps} from "../../Utils/Types";
import BowlListItem, {LoadingBowlListItem} from "./BowlListItem/BowlListItem";

export const Bowls = () => {

    const [bowls, setBowls] = useState<BowlProps[] | undefined>(undefined);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/bowls?filter[orderDeadline]=" + (new Date()).toISOString())
            .then(response => {
                setBowls(response.data ?? [])
        });
    }, []);

      return (
          <>
              <div className={"flex flex-col gap-y-3 justify-center items-center"}>
                <div className={'lg:w-3/4 w-11/12'}>
                  {
                      !bowls ? 
                        Array(3).fill(null).map((element, index) => <LoadingBowlListItem key={index}/>) 
                      : (bowls.length ? bowls.map((bowl: BowlProps, index) => (
                          <BowlListItem key={index} {...bowl} />
                  )) : <span>Nothing Found</span>)}
                  </div>
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
