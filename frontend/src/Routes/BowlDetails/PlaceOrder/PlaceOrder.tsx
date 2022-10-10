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
        let updated = unique;
        if(!updated.some(obj => obj.id === testItem.id && obj.additionalInformation === testItem.additionalInformation)) {
            updated.push(testItem)
        } else {
            updated = unique.map((obj) => {
                return obj.id === testItem.id && obj.additionalInformation === testItem.additionalInformation
                    ? {...obj, count: obj.count+1}
                    : obj
            });
        }
        return updated;
    }, [] as Array<OrderItemProp>)

    console.log(uniqueItems)
    const items = uniqueItems

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
                <div className={'pl-5 pr-5 w-full'}>
                    <h2 className={'text-2xl font-extrabold mt-5'}>Summary</h2>
                    <FinalOrderItemList items={items} />
                    <h2 className={'text-2xl font-extrabold mt-5'}>Payment</h2>
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
                            <div className={'flex justify-center items-center h-[6rem] bg-gray-300 w-full border-2 border-transparent rounded'}>
                                <h3 className={'font-extrabold'}>{method.toUpperCase()}</h3>
                            </div>
                        </label>
                    </div>)}
                </div>
                    <Button onClick={() => selectedItems.length && placeOrder()} type={'button'} text={!order ? 'Place Order' : 'Order is Placed'} />
                </div>
            </Popup>
        </>
    )
}

export default PlaceOrder