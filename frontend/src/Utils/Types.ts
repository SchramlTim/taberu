export type OrderProps = {
    bowlId: number,
    finalPrice: number,
    id: number,
    orderStatus: string,
    paymentMethod: string,
    paymentStatus: string,
    selfLink: string,
    userId: number
}

export type BowlProps = {
    id: string,
    name: string,
    description: string,
    orderDeadline: string,
    arriveDate: string,
    creatorId: string,
    menuId: string,
}

export type MenuProps = {
    id: string,
    name: string,
    description: string
}

export type MenuItemProps = {
    id: string,
    name: string,
    description: string,
    price: number
}

export type OrderItemProp = {
    id: string,
    name: string,
    price: number,
    count: number,
    additionalInformation: string
}