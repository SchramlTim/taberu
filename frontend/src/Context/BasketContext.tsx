import React, {createContext, FC, useState} from "react";
import {MenuItemProps, OrderItemProp} from "../Utils/Types";

type BasketProviderState = {
    selectedItems: MenuItemProps[],
    increaseItem(item: MenuItemProps): void,
    reduceItem(item: MenuItemProps): void,
}

export const BasketContext = createContext({
    selectedItems: [],
    increaseItem: (item) => {},
    reduceItem: (item) => {},
} as BasketProviderState);

export const BasketProvider: FC = ({ children }) => {
    const [items, setSelectedItems] = useState<MenuItemProps[]>([]);

    const increaseItem = (item: MenuItemProps) => {
        const changedList = [...items];
        changedList.push(item)
        setSelectedItems(changedList)
    }
    const reduceItem = (item: MenuItemProps) => {
        const index = items.findIndex((listItem) => listItem.id === item.id);
        items.splice(index, 1)
        setSelectedItems([...items])
    }

    return (
        <BasketContext.Provider value={{ selectedItems: items, increaseItem, reduceItem }}>
            {children}
        </BasketContext.Provider>
    );
}