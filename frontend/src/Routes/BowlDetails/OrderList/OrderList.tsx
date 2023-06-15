import React from 'react';
import {OrderProps} from "../../../Utils/Types";
import OrderDetail from "./OrderDetail/OrderDetail";

function OrderList(props : { orders : OrderProps[] }) {
    const orders = props.orders
    return (
        <div className={'flex flex-col gap-3'}>
            {
                orders.map((order: OrderProps) => (
                    <OrderDetail key={order.id} order={order} />
                ))}
        </div>
    )
}

export function LoadingOrderList() {
    return (
         <div className={'flex flex-col gap-3'}>
            {Array(4).fill(null).map(() => (<span className={'text-2xl w-full flex animate-pulse'}><span className={'bg-gray-300 w-full h-10 rounded-lg'}></span></span>))}
        </div>
    )
}

export default OrderList;
