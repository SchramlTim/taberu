import React, {createContext, FC, useState} from "react";
import {MenuItemProps, OrderItemProp} from "../Utils/Types";

type BasketProviderState = {
    selectedItems: OrderItemProp[],
    paymentMethod: string,
    increaseItem(item: MenuItemProps): void,
    reduceItem(item: MenuItemProps): void,
    setPaymentMethod (method: string): void
}

export const BasketContext = createContext({
    selectedItems: [],
    paymentMethod: '',
    increaseItem: (item) => {},
    reduceItem: (item) => {},
    setPaymentMethod: (method: string) => {}
} as BasketProviderState);

export const BasketProvider: FC = ({ children }) => {
    const [items, setSelectedItems] = useState<OrderItemProp[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');

    const increaseItem = (item: MenuItemProps) => {
        const changedList = [...items];
        changedList.push({...item, count: 1, additionalInformation: ''})
        setSelectedItems(changedList)
    }
    const reduceItem = (item: MenuItemProps) => {
        const index = items.findIndex((listItem) => listItem.id === item.id);
        items.splice(index, 1)
        setSelectedItems([...items])
    }

    return (
        <BasketContext.Provider value={{ selectedItems: items, paymentMethod, increaseItem, reduceItem, setPaymentMethod }}>
            {children}
        </BasketContext.Provider>
    );
}