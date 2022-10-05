import React, {useState, useEffect, useContext} from 'react';
import {OrderItemProp} from "../../../../../Utils/Types";

function OrderItem(props: {item: OrderItemProp}) {

    return (
        <>
            <div
                className={'flex gap-2 flex-wrap justify-between mt-3 rounded w-full bg-gray-200'}
            >
                <div className={'w-5/6 flex gap-2 flex-wrap justify-between p-2'}>
                    <span className={'break-all'}>{props.item.name}</span>
                    <span className={'break-all'}>{props.item.count}x</span>
                    <span className={'break-all text-right'}>{props.item.price.toFixed(2)} €</span>
                    <span className={'w-full break-all'}>{props.item.additionalInformation}</span>
                </div>
            </div>
        </>
    )
}

export default OrderItem