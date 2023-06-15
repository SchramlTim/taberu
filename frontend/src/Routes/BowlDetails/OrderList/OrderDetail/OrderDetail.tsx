import React, { useState, useEffect, useContext } from 'react';
import { BowlContext } from '../../../../Context/BowlContext';
import { UserContext } from '../../../../Context/UserContext';
import { get, patch } from "../../../../Utils/Request";
import { OrderProps } from '../../../../Utils/Types';

function OrderDetail(props: {order: OrderProps}) {

    const { order } = props
    const [orderUser, setUser] = useState<any>([]);
    const { user } = useContext(UserContext);
    const { bowl } = useContext(BowlContext);

    const togglePaymentStatus = () => {
        if (user?.id === bowl?.creatorId) {
            const toggleStatus = order.paymentStatus === 'PAID' ? 'NOT_PAID' : 'PAID'
            patch(process.env.REACT_APP_API_ENDPOINT + "/v1/bowls/" + bowl?.id + "/orders/" + order.id, {
                paymentStatus: toggleStatus
            })
        }
    }

    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/users/" + order.userId)
            .then(response => {
                setUser(response.data)
            });
    }, [])

    return (
        <div className={'flex gap-2 flex-wrap justify-between p-2 rounded bg-gray-200 w-full'} onClick={togglePaymentStatus}>
            <span className={'w-1/3 break-all'}>{orderUser.firstName} {orderUser.lastName}</span>
            <span className={'w-1/4 break-all text-right ' + (order.paymentStatus === 'PAID' ? 'text-green-400' : 'text-red-500')}>{order.finalPrice.toFixed(2)} €</span>
            <span className={'w-1/4 break-all text-gray-600 text-center'}>{order.paymentStatus}</span>
        </div>
    )
}

export default OrderDetail
