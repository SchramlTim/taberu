import Button from "../../../Components/Button/Button";
import React, {useCallback, useContext, useState} from "react";
import {BasketContext} from "../../../Context/BasketContext";
import {post} from "../../../Utils/Request";
import {MenuItemProps, OrderItemProp, OrderProps} from "../../../Utils/Types";
import Popup from "../../../Components/Popup/Popup";
import FinalOrderItemList from "./FinalOrderItemList/FinalOrderItemList";
import HorizontalSlide from "../../../Components/HorizontalSlide/HorizontalSlide";


function PlaceOrder (props: {bowlId: string}) {

    const id = props.bowlId
    const offeredPaymentMethods = ['cash', 'paypal']
    const {selectedItems, paymentMethod, setPaymentMethod} = useContext(BasketContext)
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
                <HorizontalSlide headlines={[
                    {title: 'Basket'},
                    {title: 'Payment'},
                    {title: 'Order completion'},
                ]}>
                        <div className={'h-full pl-5 pr-5 min-w-full'}>
                            <FinalOrderItemList items={items} />
                        </div>
                        <div className={'h-full pl-5 pr-5 min-w-full'}>
                            <span>{paymentMethod}</span>
                            <div className={'flex flex-col gap-2'}>
                                {offeredPaymentMethods.map((method, index) => <div key={method}>
                                    <input
                                        className={'hidden'}
                                        name={'paymentMethod'}
                                        id={method}
                                        type={'radio'}
                                        defaultChecked={index === 0}
                                        onClick={(e) => setPaymentMethod(e.currentTarget.id)}
                                    />
                                    <label htmlFor={method}>
                                        <div className={'h-[6rem] bg-gray-300 w-full border-2 border-transparent rounded'}>{method.toUpperCase()}</div>
                                    </label>
                                </div>)}
                            </div>
                        </div>
                </HorizontalSlide>
            </Popup>
        </>
    )
}

export default PlaceOrder