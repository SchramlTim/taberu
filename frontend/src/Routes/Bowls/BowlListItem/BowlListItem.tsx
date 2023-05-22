import React, {useState, useCallback, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {BowlProps, MenuItemProps, OrderProps} from "../../../Utils/Types";
import {useParams} from "react-router";
import {UserContext} from "../../../Context/UserContext";
import {get} from "../../../Utils/Request";

function BowlListItem(bowl: BowlProps) {

    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [categories, setMenuCategories] = useState<MenuItemProps[]>([]);

    useEffect(() => {
        get(bowl.orders)
            .then(response => {
                setOrders(response.data)
            });
        get(process.env.REACT_APP_API_ENDPOINT + '/v1/menus/' + bowl.menuId + '/categories')
            .then(response => {
                setMenuCategories(response.data)
            });
    }, [bowl.id]);

    return (
        <Link
            key={bowl.id}
            to={'/bowls/' + bowl.id}
            className={'' +
                'flex flex-wrap gap-1 ' +
                'w-3/4 min-h-10 p-3 rounded-lg shadow-xl' +
                ' transition ease-in-out delay-50 duration-200 hover:bg-amber-200'}
        >
            <span className={'text-2xl w-full'}>{bowl.name} ({orders.length})</span>
            <span className={'w-full text-gray-500'}>{bowl.description}</span>
            <div className={'flex'}>
                {categories.map((category: any) => <div className={'flex flex-col w-8'}>
                    <img
                        src={category.iconUrl}
                    />
                </div>)}
            </div>
            <div className={'w-full flex justify-between mt-5 text-gray-500'}>
                <span>{(new Date(bowl.orderDeadline)).toLocaleString()}</span>
                <span>{(new Date(bowl.arriveDate)).toLocaleString()}</span>
            </div>
        </Link>
      );
  }

export default BowlListItem;