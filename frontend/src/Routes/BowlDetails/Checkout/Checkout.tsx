import Button from '../../../Components/Button/Button'
import { useCallback, useContext, useState } from 'react'
import { BasketContext } from '../../../Context/BasketContext'
import { post } from '../../../Utils/Request'
import { OrderItemProp, OrderProps } from '../../../Utils/Types'
import Popup from '../../../Components/Popup/Popup'
import FinalizeOrder from './FinalizeOrder/FinalizeOrder'
import ThankYou from './ThankYou/ThankYou'

function Checkout() {

    const { basketItems, order, reset } =
        useContext(BasketContext)
    const [display, setDisplayState] = useState(false)

    const toggleMenu = useCallback(async () => {
        setDisplayState(!display)
        if (display && order) {
          reset() 
        }
    }, [display, order])

    const totalsum = basketItems
        .reduce((sum, item) => (sum += (item.price * item.count)), 0)
        .toFixed(2)

    console.log(order)


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
              { !order ? <FinalizeOrder /> : <ThankYou /> }
            </Popup>
        </>
    )
}

export default Checkout
