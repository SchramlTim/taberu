import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {BowlProps, MenuItemProps, OrderProps} from "../../../Utils/Types";
import {get} from "../../../Utils/Request";
import Spinner from "../../../Components/Spinner/Spinner";

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
            <span className={'text-2xl w-full'}>{bowl.name} {orders.length ? `(${orders.length})` : <LoadingOrderCount/>}</span>
            <span className={'w-full text-gray-500'}>{bowl.description}</span>
            <div className={'flex h-8 items-center'}>
                {categories.length ? categories.map((category: any) => {
                    return (
                        <div className={'flex flex-col w-8'}><img src={category.iconUrl}/></div>
                    )
                }) : <LoadingCategories/>}
            </div>
            <div className={'w-full flex justify-between mt-5 text-gray-500'}>
                <span>{(new Date(bowl.orderDeadline)).toLocaleString()}</span>
                <span>{(new Date(bowl.arriveDate)).toLocaleString()}</span>
            </div>
        </Link>
    );
}

export function LoadingBowlListItem() {
    return (
        <div
            className={'' +
                'flex flex-wrap gap-[0.325rem] ' +
                'w-3/4 min-h-10 p-3 rounded-lg shadow-xl' +
                ' transition ease-in-out delay-50 duration-200 hover:bg-amber-200'}
        >
            <span className={'text-2xl w-full flex animate-pulse'}><span className={'bg-gray-300 w-1/2 h-8 rounded-lg'}></span> <LoadingOrderCount/></span>
            <span className={'flex flex-[0_0_100%] animate-pulse w-full bg-gray-300 w-10 h-6 rounded-lg'}></span>
            <div className={'flex h-8 items-center'}>
                <LoadingCategories/>
            </div>
            <div className={'w-full flex justify-between mt-5 text-gray-500'}>
                <span className={'bg-gray-300 w-1/3 h-5 rounded-lg animate-pulse'}></span>
                <span className={'bg-gray-300 w-1/3 h-5 rounded-lg animate-pulse'}></span>
            </div>
        </div>
    )
}

function LoadingOrderCount() {
    return (
        <span className={'bg-gray-300 w-7 h-7 animate-pulse ml-1 rounded-full'}></span>
    );
}

function LoadingCategories() {
    return (
        <div className={'flex gap-1 animate-pulse'}>
            <div className={'h-8 w-8 bg-gray-300 rounded'}></div>
            <div className={'h-8 w-8 bg-gray-300 rounded'}></div>
            <div className={'h-8 w-8 bg-gray-300 rounded'}></div>
        </div>
    );
}

export default BowlListItem;