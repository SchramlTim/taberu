import Button from "../../../Components/Button/Button";
import React, {useCallback, useContext, useState} from "react";
import {BasketContext} from "../../../Context/BasketContext";
import {post} from "../../../Utils/Request";
import {MenuItemProps, OrderItemProp, OrderProps} from "../../../Utils/Types";
import Popup from "../../../Components/Popup/Popup";
import FinalOrderItemList from "./FinalOrderItemList/FinalOrderItemList";


function PlaceOrder (props: {bowlId: string}) {

    const id = props.bowlId
    const {selectedItems} = useContext(BasketContext)
    const [display, setDisplayState] = useState(false);
    const [order, setOrder] = useState<OrderProps|undefined>(undefined);

    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
    }, [display])


    const uniqueItems = selectedItems.reduce((unique, testItem) => {
        if(!unique.some(obj => obj.id === testItem.id)) {
            unique.push(testItem)
        }
        return unique;
    }, [] as Array<MenuItemProps>)

    const items = uniqueItems.map((uniqueItem) => {
        return {
            id: uniqueItem.id,
            name: uniqueItem.name,
            price: uniqueItem.price,
            count: selectedItems.filter((selItem) => selItem.id === uniqueItem.id).length,
            additionalInformation: 'sdasda'
        } as OrderItemProp
    })

    const placeOrder = async () => {
        const response = await post(process.env.REACT_APP_API_ENDPOINT + '/v1/bowls/' + id + '/orders', {
            paymentMethod: 'Paypal',
            finalPrice: 1337,
            items: items
        })

        setOrder(response.data)
    }

    return (
        <>
            <Button onClick={() => selectedItems.length && setDisplayState(!display)} type={'button'} text={'Check Order'} />
            <Popup display={display} toggle={toggleMenu}>
                <div className={'ml-5 mr-5'}>
                    <FinalOrderItemList items={items} />
                    <Button onClick={() => selectedItems.length && placeOrder()} type={'button'} text={!order ? 'Place Order' : 'Order is Placed'} />
                </div>
            </Popup>
        </>
    )
}

export default PlaceOrder