import { useContext, useRef, useState } from "react";
import { BasketContext } from "../../../../../Context/BasketContext";
import { MenuItemProps } from "../../../../../Utils/Types";

function AmountHandler(props: {item: MenuItemProps}) {

    const [active, toggle] = useState(false)
    const { basketItems, increaseItem, reduceItem } = useContext(BasketContext);
    const item = props.item

    const selfSelectList = basketItems.filter((listItem) => listItem.id === item.id)
    return (
            <div className={'flex items-center justify-center font-bold gap-1 mr-2'}>
                {active && <div className="h-8 w-12 bg-background-secondary animate-fadeIn flex items-center justify-center rounded-xl" onClick={() => reduceItem(item)}>-</div>}
                <span className={'flex items-center justify-center w-12 h-12 bg-background-secondary rounded-full text-center'} onClick={() => toggle(!active)}>{selfSelectList.length}</span>
                {active && <div className="h-8 w-12 bg-background-secondary animate-fadeIn flex items-center justify-center rounded-xl" onClick={() => increaseItem(item)}>+</div>}
            </div>
    )
}

export default AmountHandler
