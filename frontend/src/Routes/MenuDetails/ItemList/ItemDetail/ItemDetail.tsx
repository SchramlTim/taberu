import React, { useState, useEffect } from 'react'
import { get } from '../../../../Utils/Request'
import { MenuItemProps } from '../../../../Utils/Types'

function ItemDetail(props: { item: MenuItemProps }) {
    const item = props.item

    return (
        <div
            className={
                'flex gap-2 flex-wrap justify-between mt-3 p-2 rounded bg-gray-200 w-full'
            }
        >
            <span className={'w-1/3 break-all'}>{item.name}</span>
            <span className={'w-1/4 break-all text-gray-600 text-center'}>
                {item.price}
            </span>
        </div>
    )
}

export default ItemDetail
