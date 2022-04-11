import React, {useState, useCallback, useContext} from 'react';
import {BowlProps} from "../../Routes/Bowls/Bowls";
import { Link } from 'react-router-dom';

function BowlListElement(bowlDetails: BowlProps) {
    return (
        <Link
            key={bowlDetails.id}
            to={'/bowls/' + bowlDetails.id}
            className={'' +
                'flex flex-wrap gap-1 ' +
                'w-3/4 min-h-10 p-3 rounded-lg shadow-xl' +
                ' transition ease-in-out delay-50 duration-200 hover:bg-amber-200'}
        >
            <span className={'text-lg w-full'}>{bowlDetails.name}</span>
            <span className={'w-full text-gray-500'}>{bowlDetails.description}</span>
            <div className={'w-full flex justify-between mt-5 text-gray-500'}>
                <span>{bowlDetails.orderDeadline}</span>
                <span>{bowlDetails.arriveDate}</span>
            </div>
        </Link>
      );
  }

export default BowlListElement;