import React, { useState, useEffect } from 'react';
import { get } from "../../../../Utils/Request";

function OrderDetail(props: {order: any}) {

    const [user, setUser] = useState<any>([]);
    const order = props.order

    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/users/" + order.userId)
            .then(response => {
                setUser(response.data)
            });
    }, [])

    return (
        <div className={'flex gap-2 flex-wrap justify-between mt-3 p-2 rounded bg-gray-200 w-full'}>
            <span className={'w-1/3 break-all'}>{user.firstName} {user.lastName}</span>
            <span className={'w-1/4 break-all text-right ' + (order.paymentStatus === 'PAID' ? 'text-green-400' : 'text-red-500')}>{order.finalPrice.toFixed(2)} €</span>
            <span className={'w-1/4 break-all text-gray-600 text-center'}>{order.paymentStatus}</span>
        </div>
    )
}

export default OrderDetail