import React from 'react';
import {OrderItemProp} from "../../../../Utils/Types";
import OrderItem from "./OrderItem/OrderItem";

function FinalOrderItemList(props : { items : OrderItemProp[] }) {
    const items = props.items
    return (
        <div>
            {
                items.map((item: OrderItemProp) => (
                    <OrderItem key={item.id} item={item} />
                ))}
        </div>
    )
}

export default FinalOrderItemList ;