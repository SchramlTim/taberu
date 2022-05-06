import Button from "../../../Components/Button/Button";
import React, {useContext, useState} from "react";
import {BasketContext} from "../../../Context/BasketContext";
import {post} from "../../../Utils/Request";
import {OrderItemProp} from "../../../Utils/Types";


function PlaceOrder (props: {bowlId: string}) {

    const id = props.bowlId
    const {selectedItems} = useContext(BasketContext)

    const placeOrder = () => {


        const orderItems = selectedItems.map((item) => {
            return {
                name: item.name,
                price: item.price,
                count: 1,
                additionalInformation: ''
            } as OrderItemProp
        })

        const items = orderItems.reduce((prev, curr) => {
            prev.count += curr.count;
            return prev;
        })

        post('/v1/bowls/' + id + '/orders', {
            paymentMethod: 'Paypal',
            finalPrice: 1337,
            items: items
        })
    }


    return (
        <>
            <Button onClick={(e: any) => placeOrder()} type={'button'} text={'Place Order'} />
        </>
    )
}

export default PlaceOrder