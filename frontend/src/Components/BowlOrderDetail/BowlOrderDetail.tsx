import React, { useState, useEffect } from 'react';
import {getData} from "../Utils/GetData";

export type OrderDetailsType = {
    bowlId: number,
    finalPrice: number,
    id: number,
    orderStatus: string,
    paymentMethod: string,
    paymentStatus: string,
    selfLink: string,
    userId: number
}

function BowlOrderDetail(props: {order: OrderDetailsType}) {

    const [user, setUser] = useState<any>([]);
    const order = props.order

    useEffect(() => {
        getData("/v1/users/" + order.userId)
            .then(response => {
                setUser(response.data)
            });
    })

    return (
        <div>
            <span>{order.id}</span>
            <span>{user.firstName}</span>
        </div>
    )
}

export default BowlOrderDetail