import React, {createContext, FC, useState} from "react";
import {MenuItemProps, OrderItemProp} from "../Utils/Types";

type BasketProviderState = {
    basketItems: OrderItemProp[],
    paymentMethod: string,
    increaseItem(item: MenuItemProps): void,
    reduceItem(item: MenuItemProps): void,
    setPaymentMethod (method: string): void,
    addInformationToBasketItem (index: number, additionalInformation: string): void
}

export const BasketContext = createContext({
    basketItems: [],
    paymentMethod: '',
    increaseItem: (item) => {},
    reduceItem: (item) => {},
    setPaymentMethod: (method: string) => {},
    addInformationToBasketItem: (index: number, additionalInformation: string) => {}
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

    const addInformationToBasketItem = (index: number, additionalInformation: string) => {
        const item = items[index];
        item.additionalInformation = additionalInformation
        items[index] = item
        setSelectedItems([...items ]);
    }

    return (
        <BasketContext.Provider value={{ basketItems: items, paymentMethod, increaseItem, reduceItem, setPaymentMethod, addInformationToBasketItem }}>
            {children}
        </BasketContext.Provider>
    );
}
