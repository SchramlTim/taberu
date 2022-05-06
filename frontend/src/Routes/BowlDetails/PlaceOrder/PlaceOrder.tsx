import Button from "../../../Components/Button/Button";
import React, {useState} from "react";
import TextInput from "../../../Components/TextInput/TextInput";


function PlaceOrder () {
    const [isOpen, setOpenState] = useState(false);


    if (!isOpen) {
        return <Button onClick={(e: any) => setOpenState(true)} type={'button'} text={'Place Order'} />
    }


    return (
        <>

        </>
    )
}

export default PlaceOrder