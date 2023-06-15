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
                className={'flex flex-wrap justify-between rounded w-full ' + (selfSelectList.length > 0 ? 'bg-green-100' : 'bg-gray-200')}
            >
                <div className={'w-5/6 flex gap-2 flex-wrap justify-between p-2'} onClick={() => increaseItem(item)}>
                    <div className={'flex flex-col'}>
                        <span className={'font-bold break-all'}>{item.name}</span>
                        <span className={'break-all'}>{item.description} dasdasad</span>
                    </div>
                    <span className={'flex justify-center items-center break-all text-right'}>{item.price.toFixed(2)} €</span>
                </div>
                {selfSelectList.length > 0 && <div onClick={(e) => {
                    e.preventDefault()
                    reduceItem(item)
                }} className={'w-1/6 flex items-center justify-center font-bold'}>
                    <span className={'flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full text-center'}>{selfSelectList.length}</span>
                </div>}
            </div>
        </>
    )
}

export default Item
