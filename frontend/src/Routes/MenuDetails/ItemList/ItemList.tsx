import React from 'react';
import {MenuItemProps} from "../../../Utils/Types";
import ItemDetail from "./ItemDetail/ItemDetail";

function ItemList(props : { items : MenuItemProps[] }) {
    const items = props.items
    return (
        <div>
            {
                items.map((item: MenuItemProps) => (
                    <ItemDetail key={item.id} item={item} />
                ))}
        </div>
    )
}

export default ItemList ;