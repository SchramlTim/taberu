import { useCallback, useContext, useState } from 'react'
import { BasketContext } from '../../../../Context/BasketContext'
import { post } from '../../../../Utils/Request'
import { OrderItemProp, OrderProps } from '../../../../Utils/Types'
import FinalOrderItemList from '../FinalOrderItemList/FinalOrderItemList'
import { BowlContext } from '../../../../Context/BowlContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import Button from '../../../../Components/Button/Button'

function FinalizeOrder() {
  
    const { basketItems, paymentMethod, setPaymentMethod, placeOrder, uniqueItems } =
        useContext(BasketContext)
    const [order, setOrder] = useState<OrderProps | undefined>(undefined)
    const bowl = useContext(BowlContext)

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


  return (
      <div className={'pl-5 pr-5 w-full'}>
        <h2 className={'text-2xl font-extrabold mt-5'}>Summary</h2>
        <FinalOrderItemList items={basketItems} />
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
  )
}

export default FinalizeOrder
