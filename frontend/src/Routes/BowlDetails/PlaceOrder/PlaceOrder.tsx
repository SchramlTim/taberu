import Button from '../../../Components/Button/Button'
import { useCallback, useContext, useState } from 'react'
import { BasketContext } from '../../../Context/BasketContext'
import { post } from '../../../Utils/Request'
import { OrderItemProp, OrderProps } from '../../../Utils/Types'
import Popup from '../../../Components/Popup/Popup'
import FinalOrderItemList from './FinalOrderItemList/FinalOrderItemList'
import { BowlContext } from '../../../Context/BowlContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

function PlaceOrder() {
    const offeredPaymentMethods = [
        {
            method: 'cash',
            icon: faWallet,
        },
        {
            method: 'paypal',
            icon: faPaypal,
        },
    ]

    const { basketItems, paymentMethod, setPaymentMethod } =
        useContext(BasketContext)
    const [display, setDisplayState] = useState(false)
    const [order, setOrder] = useState<OrderProps | undefined>(undefined)
    const { bowl } = useContext(BowlContext)

    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
    }, [display])

    const uniqueItems = basketItems.reduce((unique, testItem) => {
        let updated = unique
        if (
            !updated.some(
                (obj) =>
                    obj.id === testItem.id &&
                    obj.additionalInformation === testItem.additionalInformation
            )
        ) {
            updated.push(testItem)
        } else {
            updated = unique.map((obj) => {
                return obj.id === testItem.id &&
                    obj.additionalInformation === testItem.additionalInformation
                    ? { ...obj, count: obj.count + 1 }
                    : obj
            })
        }
        return updated
    }, [] as Array<OrderItemProp>)

    const indexOfAll = (arr: OrderItemProp[], val: OrderItemProp) => {
        return arr.reduce(
            (acc: Array<number>, el: OrderItemProp, currentIndex) => {
                return el.id === val.id &&
                    el.additionalInformation === val.additionalInformation
                    ? [...acc, currentIndex]
                    : [...acc]
            },
            []
        )
    }
    const items = uniqueItems.map((item) => {
        return { ...item, basketIndex: indexOfAll(basketItems, item) }
    })

    const placeOrder = async () => {
        if (!bowl) {
            return
        }
        const response = await post(
            process.env.REACT_APP_API_ENDPOINT +
                '/v1/bowls/' +
                bowl.id +
                '/orders',
            {
                paymentMethod: paymentMethod,
                items: items,
            }
        )
        setOrder(response.data)
    }
    const totalsum = basketItems
        .reduce((sum, item) => (sum += item.price), 0)
        .toFixed(2)

    return (
        <>
            <div className="flex justify-between text-2xl">
                <span>Total</span>
                <span>{`${totalsum} €`}</span>
            </div>
            <Button
                variant="primary"
                onClick={() => basketItems.length && setDisplayState(!display)}
                type={'button'}
                text={`Finalize Order`}
            />
            <Popup display={display} toggle={toggleMenu}>
                <div className={'pl-5 pr-5 w-full'}>
                    <h2 className={'text-2xl font-extrabold mt-5'}>Summary</h2>
                    <FinalOrderItemList items={items} />
                    <h2 className={'text-2xl font-extrabold mt-5'}>Payment</h2>
                    <div className={'flex flex-col gap-2'}>
                        {offeredPaymentMethods.map((payment, index) => (
                            <div key={payment.method}>
                                <input
                                    className={'hidden'}
                                    name={'paymentMethod'}
                                    id={payment.method}
                                    type={'radio'}
                                    defaultChecked={index === 0}
                                    onClick={(e) =>
                                        setPaymentMethod(e.currentTarget.id)
                                    }
                                />
                                <label htmlFor={payment.method}>
                                    <div
                                        className={
                                            'flex justify-between items-center gap-3 px-3 h-[6rem] bg-gray-200 w-full border-2 rounded ' +
                                            (payment.method === paymentMethod
                                                ? 'border-button-primary'
                                                : 'border-transparent')
                                        }
                                    >
                                        <div
                                            className={
                                                'flex justify-center items-center rounded-full w-10 h-10 bg-white'
                                            }
                                        >
                                            <div
                                                className={
                                                    'rounded-full bg-button-primary transition-all duration-200 ' +
                                                    (payment.method ===
                                                    paymentMethod
                                                        ? 'w-5 h-5'
                                                        : 'w-0 h-0')
                                                }
                                            ></div>
                                        </div>
                                        <div
                                            className={
                                                'flex justify-center items-center gap-3'
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={payment.icon}
                                            />
                                            <h3 className={'font-extrabold'}>
                                                {payment.method.toUpperCase()}
                                            </h3>
                                        </div>
                                        <div></div>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => basketItems.length && placeOrder()}
                        type={'button'}
                        text={!order ? 'Order now' : 'Order is Placed'}
                    />
                </div>
            </Popup>
        </>
    )
}

export default PlaceOrder
