import React, {useState, useEffect, useContext} from 'react';
import {OrderItemProp} from "../../../../../Utils/Types";
import {BasketContext} from "../../../../../Context/BasketContext";

export type OrderItemInBasketContext = OrderItemProp & {basketIndex: number[]};

function OrderItem(props: {item: OrderItemInBasketContext}) {

    const {addInformationToBasketItem} = useContext(BasketContext)

    return (
        <>
            <div
                className={'flex gap-2 flex-wrap justify-between mt-3 rounded w-full bg-gray-200'}
                onClick={() => addInformationToBasketItem(props.item.basketIndex[0], (Math.random() * 0xffffff).toString(16))}
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