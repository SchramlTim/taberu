import React from 'react';
import Item from "./Item/Item";
import {MenuItemProps} from "../../../Utils/Types";

function OrderableItemList(props : { items : MenuItemProps[] }) {
    const items = props.items
    return (
        <div>
            {
                items.map((item: MenuItemProps) => (
                    <Item key={item.id} item={item} />
                ))}
        </div>
    )
}

export default OrderableItemList ;