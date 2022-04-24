import React from 'react';
import BowlOrderDetail, {OrderDetailsType} from "../BowlOrderDetail/BowlOrderDetail";

function BowlOrderList(props : { orders : OrderDetailsType[] }) {
    const orders = props.orders
    return (
        <div>
            {
                orders.map((order: OrderDetailsType) => (
                    <BowlOrderDetail key={order.id} order={order} />
                ))}
        </div>
    )
}

export default BowlOrderList ;