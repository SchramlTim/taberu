import React from 'react';
import Item from "./Item/Item";
import {MenuItemProps} from "../../../Utils/Types";
import PlaceOrder from '../PlaceOrder/PlaceOrder';

function OrderableItemList(props : { items : MenuItemProps[] }) {
    const items = props.items
    return (
        <>
            <div className={'flex flex-col gap-3'}>
                {
                    items.map((item: MenuItemProps) => (
                        <Item key={item.id} item={item} />
                    ))}
            </div>
        </>
    )
}

export function LoadingOrderableItemList() {
    return (
         <div className={'flex flex-col gap-3'}>
            {Array(4).fill(null).map((element, index) => (<span key={index} className={'text-2xl w-full flex animate-pulse'}><span className={'bg-gray-300 w-full h-16 rounded-lg'}></span></span>))}
        </div>
    )
}

export default OrderableItemList
