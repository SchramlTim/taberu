import Button from "../../../Components/Button/Button";
import React, {useCallback, useContext, useState} from "react";
import {BasketContext} from "../../../Context/BasketContext";
import {post} from "../../../Utils/Request";
import {MenuItemProps, OrderItemProp, OrderProps} from "../../../Utils/Types";
import Popup from "../../../Components/Popup/Popup";
import FinalOrderItemList from "./FinalOrderItemList/FinalOrderItemList";
import HorizontalSlide from "../../../Components/HorizontalSlide/HorizontalSlide";
import { BowlContext } from "../../../Context/BowlContext";


function PlaceOrder () {

    const offeredPaymentMethods = ['cash', 'paypal']
    const {basketItems, paymentMethod, setPaymentMethod} = useContext(BasketContext)
    const [display, setDisplayState] = useState(false);
    const [order, setOrder] = useState<OrderProps|undefined>(undefined);
    const { bowl } = useContext(BowlContext);

    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
    }, [display])

    const uniqueItems = basketItems.reduce((unique, testItem) => {
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

    const indexOfAll = (arr: OrderItemProp[], val: OrderItemProp) => {
        return arr.reduce((acc: Array<number>, el: OrderItemProp, currentIndex) => {
            return el.id === val.id && el.additionalInformation === val.additionalInformation ? [...acc, currentIndex] : [...acc]
        }, []);
    }
    const items = uniqueItems.map((item) => {
        return {...item, basketIndex: indexOfAll(basketItems, item)}
    })

    const placeOrder = async () => {
        if (!bowl) {
          return
        }
        const response = await post(process.env.REACT_APP_API_ENDPOINT + '/v1/bowls/' + bowl.id + '/orders', {
            paymentMethod: paymentMethod,
            items: items
        })
        setOrder(response.data)
    }

    const totalsum = basketItems.reduce((sum, item) => sum += item.price, 0)

    return (
        <>
            <div className="text-2xl">
                <span>{`${items.length}x items`}</span>
            </div>
            <Button variant="primary" onClick={() => basketItems.length && setDisplayState(!display)} type={'button'} text={`Finalize Order (${totalsum}€)`} />
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
                    <Button variant="primary" onClick={() => basketItems.length && placeOrder()} type={'button'} text={!order ? 'Place Order' : 'Order is Placed'} />
                </div>
            </Popup>
        </>
    )
}

export default PlaceOrder
