import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuListElement from "./MenuListElement/MenuListElement"
import {get} from "../../Utils/Request";
import {MenuProps} from "../../Utils/Types";

export const Menus = () => {

    const [menus, setMenus] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        get(process.env.API_ENDPOINT + "/v1/menus")
            .then(response => {
                setMenus(response.data)
        });
    }, []);

      return (
          <>
              <div className={"flex flex-col gap-y-3 justify-center items-center"}>
                  {
                      menus.map((menu: MenuProps) => (
                        <MenuListElement key={menu.id} {...menu} />
                  ))}
              </div>
              <Link to="/menus/create" className="bg-primary fixed bottom-10 right-10 text-black text-center py-2 px-4 rounded h-14 w-14 inline-flex items-center">
                  <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
              </Link>
          </>
      );
}

export default Menus;