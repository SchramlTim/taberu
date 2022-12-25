import React from 'react';
import {OrderProps} from "../../../Utils/Types";
import OrderDetail from "./OrderDetail/OrderDetail";

function OrderList(props : { orders : OrderProps[] }) {
    const orders = props.orders
    return (
        <div>
            {
                orders.map((order: OrderProps) => (
                    <OrderDetail key={order.id} order={order} />
                ))}
        </div>
    )
}

export default OrderList;
