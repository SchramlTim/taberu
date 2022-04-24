import React from 'react';
import {MenuItemProps} from "../MenuDetails";
import MenuItemDetail from "../MenuItemDetail/MenuItemDetail";

function MenuItemList(props : { items : MenuItemProps[] }) {
    const items = props.items
    return (
        <div>
            {
                items.map((item: MenuItemProps) => (
                    <MenuItemDetail key={item.id} item={item} />
                ))}
        </div>
    )
}

export default MenuItemList ;