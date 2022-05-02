import React, {useState, useCallback, useContext} from 'react';
import {MenuProps} from "../Menus";
import { Link } from 'react-router-dom';

function MenuListElement(details: MenuProps) {
    return (
        <Link
            key={details.id}
            to={'/menus/' + details.id}
            className={'' +
                'flex flex-wrap gap-1 ' +
                'w-3/4 min-h-10 p-3 rounded-lg shadow-md ' +
                'bg-white ' +
                'transition ease-in-out delay-50 duration-200 hover:bg-amber-200'}
        >
            <span className={'text-lg w-full'}>{details.name}</span>
            <span className={'w-full text-gray-500'}>{details.description}</span>
        </Link>
      );
  }

export default MenuListElement;