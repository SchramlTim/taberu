import Button from "../../../Components/Button/Button";
import {useState} from "react";


function PlaceOrder () {
    const [isOpen, setOpenState] = useState(false);


    if (!isOpen) {
        return <Button onClick={(e: any) => setOpenState(true)} type={'button'} text={'Place Order'} />
    }


    return (
        <div>open</div>
    )
}

export default PlaceOrder