import { createContext, FC, useState } from 'react'
import { OrderItemInBasketContext } from '../Routes/BowlDetails/Checkout/FinalOrderItemList/OrderItem/OrderItem'
import { post } from '../Utils/Request'
import { BowlProps, MenuItemProps, OrderItemProp, OrderProps } from '../Utils/Types'

type BasketProviderState = {
    basketItems: OrderItemInBasketContext[]
    uniqueItems: OrderItemProp[]
    paymentMethod: string
    increaseItem(item: MenuItemProps): void
    reduceItem(item: MenuItemProps): void
    setPaymentMethod(method: string): void
    addInformationToBasketItem(
        index: number,
        additionalInformation: string
    ): void
    placeOrder(): void,
    reset(): void,
    order: OrderProps | undefined
}

export const BasketContext = createContext({
    basketItems: [],
    uniqueItems: [],
    paymentMethod: '',
    increaseItem: (item) => {},
    reduceItem: (item) => {},
    setPaymentMethod: (method: string) => {},
    addInformationToBasketItem: (
        index: number,
        additionalInformation: string
    ) => {},
    placeOrder: () => {},
    reset: () => {},
    order: undefined
} as BasketProviderState)

export const BasketProvider: FC<{bowl?: BowlProps}> = ({ bowl, children }) => {
    const [items, setSelectedItems] = useState<OrderItemProp[]>([])
    const [order, setOrder] = useState<OrderProps | undefined>(undefined)
    const [paymentMethod, setPaymentMethod] = useState<string>('cash')

    const increaseItem = (item: MenuItemProps) => {
        const changedList = [...items]
        changedList.push({ ...item, count: 1, additionalInformation: '' })
        setSelectedItems(changedList)
    }

    const reduceItem = (item: MenuItemProps) => {
        const index = items.findIndex((listItem) => listItem.id === item.id)
        items.splice(index, 1)
        setSelectedItems([...items])
    }

    const addInformationToBasketItem = (
        index: number,
        additionalInformation: string
    ) => {
        const item = items[index]
        item.additionalInformation = additionalInformation
        items[index] = item
        setSelectedItems([...items])
    }

    const uniqueItems = items.reduce((unique, testItem) => {
        let updated = unique
        if (
            !updated.some(
                (obj) =>
                    obj.id === testItem.id &&
                    obj.additionalInformation === testItem.additionalInformation
            )
        ) {
            updated.push(testItem)
        } else {
            updated = unique.map((obj) => {
                return obj.id === testItem.id &&
                    obj.additionalInformation === testItem.additionalInformation
                    ? { ...obj, count: obj.count + 1 }
                    : obj
            })
        }
        return updated
    }, [] as Array<OrderItemProp>)

    const indexOfAll = (arr: OrderItemProp[], val: OrderItemProp) => {
        return arr.reduce(
            (acc: Array<number>, el: OrderItemProp, currentIndex) => {
                return el.id === val.id &&
                    el.additionalInformation === val.additionalInformation
                    ? [...acc, currentIndex]
                    : [...acc]
            },
            []
        )
    }
    const basketItems = uniqueItems.map((item) => {
        return { ...item, basketIndex: indexOfAll(items, item) }
    })

    const placeOrder = async () => {
        if (!bowl) {
            return
        }
        const response = await post(
            process.env.REACT_APP_API_ENDPOINT +
                '/v1/bowls/' +
                bowl.id +
                '/orders',
            {
                paymentMethod: paymentMethod,
                items: items,
            }
        )
        setOrder(response.data)
    }

    const reset = async () => {
        setOrder(undefined)
        setSelectedItems([])
        setPaymentMethod('')
    }

    return (
        <BasketContext.Provider
            value={{
                basketItems,
                uniqueItems,
                paymentMethod,
                increaseItem,
                reduceItem,
                setPaymentMethod,
                addInformationToBasketItem,
                placeOrder,
                order,
                reset
            }}
        >
            {children}
        </BasketContext.Provider>
    )
}
