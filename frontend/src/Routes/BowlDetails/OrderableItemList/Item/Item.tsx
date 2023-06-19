import React, {useState, useEffect, useContext} from 'react';
import {MenuItemProps} from "../../../../Utils/Types";
import {BasketContext} from "../../../../Context/BasketContext";
import AmountHandler from './AmountHandler/AmountHandler';

function Item(props: {item: MenuItemProps}) {

    const { basketItems, increaseItem, reduceItem } = useContext(BasketContext);
    const item = props.item

    const selfSelectList = basketItems.filter((listItem) => listItem.id === item.id)

    return (
        <>
            <div
                className={'flex justify-between rounded w-full overflow-x-hidden shadow-black transtion-color duration-100 ' + (selfSelectList.length > 0 ? 'bg-green-300' : 'bg-gray-200')}
            >
                <div className={'w-8/12 flex gap-2 flex-wrap justify-between p-2'} onClick={() => {
                    if (selfSelectList.length === 0) {
                        increaseItem(item)}
                    }
                }>
                    <div className={'flex flex-col'}>
                        <span className={'font-bold break-all'}>{item.name}</span>
                        <span className={'break-all'}>{item.description} dasdasad</span>
                    </div>
                    <span className={'flex justify-center items-center break-all text-right'}>{item.price.toFixed(2)} €</span>
                </div>
                <AmountHandler item={item}/> 
            </div>
        </>
    )
}

export default Item
