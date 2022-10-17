import React, {useState, useEffect, useContext} from 'react';
import {MenuItemProps} from "../../../../Utils/Types";
import {BasketContext} from "../../../../Context/BasketContext";

function Item(props: {item: MenuItemProps}) {

    const { basketItems, increaseItem, reduceItem } = useContext(BasketContext);
    const item = props.item

    const selfSelectList = basketItems.filter((listItem) => listItem.id === item.id)

    return (
        <>
            <div
                className={'flex flex-wrap justify-between mt-3 rounded w-full ' + (selfSelectList.length > 0 ? 'bg-green-100' : 'bg-gray-200')}
            >
                <div className={'w-5/6 flex gap-2 flex-wrap justify-between p-2'} onClick={() => increaseItem(item)}>
                    <span className={'break-all'}>{item.name}</span>
                    <span className={'break-all'}>{selfSelectList.length}x</span>
                    <span className={'break-all text-right'}>{item.price.toFixed(2)} €</span>
                </div>
                {selfSelectList.length > 0 && <div onClick={(e) => {
                    e.preventDefault()
                    reduceItem(item)
                }} className={'w-1/6 flex items-center justify-center font-bold bg-red-300 rounded text-center'}>
                    <span>-</span>
                </div>}
            </div>
        </>
    )
}

export default Item