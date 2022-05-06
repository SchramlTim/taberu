import React, {useState, useEffect, useContext} from 'react';
import {MenuItemProps} from "../../../../Utils/Types";
import {BasketContext} from "../../../../Context/BasketContext";

function Item(props: {item: MenuItemProps}) {

    const { selectedItems, increaseItem, reduceItem } = useContext(BasketContext);
    const item = props.item

    const selfSelectList = selectedItems.filter((listItem) => listItem.id === item.id)

    return (
        <div
            className={'flex gap-2 flex-wrap justify-between mt-3 p-2 rounded w-full ' + (selfSelectList.length > 0 ? 'bg-green-100' : 'bg-gray-200')}
            onClick={() => increaseItem(item)}
        >
            <span className={'w-1/3 break-all'}>{item.name}</span>
            <span className={'w-1/3 break-all'}>{selfSelectList.length}x</span>
            <span className={'w-1/4 break-all text-right'}>{item.price.toFixed(2)} €</span>
        </div>
    )
}

export default Item