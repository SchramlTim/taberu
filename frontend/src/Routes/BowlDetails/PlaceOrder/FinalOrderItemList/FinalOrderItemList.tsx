import React from 'react';
import {OrderItemProp} from "../../../../Utils/Types";
import OrderItem from "./OrderItem/OrderItem";

function FinalOrderItemList(props : { items : OrderItemProp[] }) {
    return (
        <div>
            {
                props.items.map((item: OrderItemProp, index) => (
                    <OrderItem key={index} item={item} />
                ))}
        </div>
    )
}

export default FinalOrderItemList ;