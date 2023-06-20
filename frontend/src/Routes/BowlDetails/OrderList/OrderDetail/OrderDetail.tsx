import React, { useState, useEffect, useContext } from 'react';
import { BowlContext } from '../../../../Context/BowlContext';
import { UserContext } from '../../../../Context/UserContext';
import { get, patch } from "../../../../Utils/Request";
import { OrderProps } from '../../../../Utils/Types';

function OrderDetail(props: {order: OrderProps}) {

    const [order, setOrder] = useState(props.order)
    const [orderUser, setUser] = useState<any>();
    const [orderItems, setOrderItems] = useState<any[]>([]);
    const { user } = useContext(UserContext);
    const { bowl } = useContext(BowlContext);
    console.log(orderItems)

    const togglePaymentStatus = () => {
        if (user?.id === bowl?.creatorId) {
            const toggleStatus = order.paymentStatus === 'PAID' ? 'NOT_PAID' : 'PAID'
            patch(process.env.REACT_APP_API_ENDPOINT + "/v1/bowls/" + bowl?.id + "/orders/" + order.id, {
                paymentStatus: toggleStatus
            }).then(() => {
                get(process.env.REACT_APP_API_ENDPOINT + "/v1/orders/" + order.id)
                    .then((response) => setOrder(response.data))
            }) 
        }
    }

    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/users/" + order.userId)
            .then(response => {
                setUser(response.data)
            });
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/orders/" + order.id + "/items")
            .then(response => {
                setOrderItems(response.data)
            });
    }, [])

    return (
        <div className={'flex gap-2 flex-wrap justify-between p-2 rounded bg-gray-200 w-full'} onClick={togglePaymentStatus}>
            <span className={'w-1/3 text-2xl font-bold'}>{orderUser?.firstName} {orderUser?.lastName}</span>
            <span className={'w-1/4 break-all text-right ' + (order?.paymentStatus === 'PAID' ? 'text-green-400' : 'text-red-500')}>{order?.finalPrice.toFixed(2)} €</span>
            <span className={'w-1/4 break-all text-gray-600 text-center'}>{order?.paymentStatus}</span>
            <ul className={"flex flex-col gap-5 w-full ml-2"}>
                {orderItems && orderItems.map((item, index) => <li key={index} className={"flex flex-col"}>
                    <div className={"grid grid-cols-[10%,20%,60%] w-full "}>
                        <span>{item?.count}x</span>
                        <span>{item?.name}</span>
                        <span>{item?.totalSum} €</span>
                    </div>
                    <span className={"w-full"}>{item?.additionalInformation}</span>
                </li>)}
            </ul>
        </div>
    )
}

export default OrderDetail
