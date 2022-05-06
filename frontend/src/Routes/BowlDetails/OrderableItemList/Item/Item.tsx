import React, { useState, useEffect } from 'react';
import { get } from "../../../../Utils/Request";
import {MenuItemProps} from "../../../../Utils/Types";

function Item(props: {item: MenuItemProps}) {

    const [user, setUser] = useState<any>([]);
    const item = props.item

    return (
        <div className={'flex gap-2 flex-wrap justify-between mt-3 p-2 rounded bg-gray-200 w-full'}>
           <span>hi</span>
        </div>
    )
}

export default Item