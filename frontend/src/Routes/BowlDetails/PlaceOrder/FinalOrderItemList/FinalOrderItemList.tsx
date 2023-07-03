import React from 'react'
import { OrderItemProp } from '../../../../Utils/Types'
import OrderItem, { OrderItemInBasketContext } from './OrderItem/OrderItem'

function FinalOrderItemList(props: { items: OrderItemInBasketContext[] }) {
    return (
        <div>
            {props.items.map((item: OrderItemInBasketContext, index) => (
                <OrderItem key={index} item={item} />
            ))}
        </div>
    )
}

export default FinalOrderItemList
