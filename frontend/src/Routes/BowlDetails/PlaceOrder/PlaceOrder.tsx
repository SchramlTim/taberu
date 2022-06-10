import Button from "../../../Components/Button/Button";
import React, {useContext, useState} from "react";
import {BasketContext} from "../../../Context/BasketContext";
import {post} from "../../../Utils/Request";
import {MenuItemProps, OrderItemProp} from "../../../Utils/Types";


function PlaceOrder (props: {bowlId: string}) {

    const id = props.bowlId
    const {selectedItems} = useContext(BasketContext)

    const placeOrder = () => {


        const uniqueItems = selectedItems.reduce((unique, testItem) => {
            console.log(testItem)
            if(!unique.some(obj => obj.id === testItem.id)) {
                console.log('before', unique, testItem)
                unique.push(testItem)
                console.log('after', unique, testItem)
            }

            console.log('after pushing', unique)
            return unique;
        }, [] as Array<MenuItemProps>)

        console.log('uni', uniqueItems)

        const items = uniqueItems.map((uniqueItem) => {
            return {
                id: uniqueItem.id,
                name: uniqueItem.name,
                price: uniqueItem.price,
                count: selectedItems.filter((selItem) => selItem.id === uniqueItem.id).length,
                additionalInformation: 'sdasda'
            } as OrderItemProp
        })

        console.log('items', items)

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