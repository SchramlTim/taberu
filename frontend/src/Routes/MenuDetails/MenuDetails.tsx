import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { get } from "../../Utils/Request";
import MenuItemList from "./MenuItemList/MenuItemList";

export type MenuProps = {
    id: string,
    name: string,
    description: string
}

export type MenuItemProps = {
    id: string,
    name: string,
    description: string,
    price: number
}

function MenuDetails() {

    let { id } = useParams<any>();
    const [menu, setMenu] = useState<MenuProps>();
    const [items, setItems] = useState<MenuItemProps[]>([]);

    useEffect(() => {
        get("/v1/menus/" + id)
            .then(response => {
                setMenu(response.data)
        });

        get("/v1/menus/" + id + '/items')
            .then(response => {
                setItems(response.data)
        });
    }, []);

      return (
        <div className={'flex flex-col w-full justify-center items-center'}>
            <div className={'flex flex-col md:flex-row justify-between w-3/4'}>
                <div className={'flex flex-col'}>
                    <h1 className={'text-4xl'}>{menu?.name}</h1>
                    <span>{menu?.description}</span>
                </div>
            </div>
            <div className={'flex flex-col w-3/4 m-10'}>
                <MenuItemList items={items}/>
            </div>
        </div>
      );
  }

export default MenuDetails;