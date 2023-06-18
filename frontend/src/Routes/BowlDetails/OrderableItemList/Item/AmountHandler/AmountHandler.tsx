import { useContext, useRef, useState } from "react";
import { BasketContext } from "../../../../../Context/BasketContext";
import { MenuItemProps } from "../../../../../Utils/Types";

function AmountHandler(props: {item: MenuItemProps}) {

    const [active, toggle] = useState(false)
    const { basketItems, increaseItem, reduceItem } = useContext(BasketContext);
    const item = props.item

    const selfSelectList = basketItems.filter((listItem) => listItem.id === item.id)
    return (
            <div className={'flex items-center justify-center font-bold gap-1 mr-2 [filter:url(#goo)]'}>
                <div className={"h-8 w-10 bg-background-secondary flex items-center justify-center rounded-xl z-0 transition-transform duration-300 translate-x-[110%] " + (active ? "translate-x-0" : '')} onClick={() => reduceItem(item)}>-</div>
                <span className={'flex items-center justify-center w-12 h-12 bg-background-secondary rounded-full text-center z-10'} onClick={() => toggle(!active)}>{selfSelectList.length}</span>
                <div className={"h-8 w-10 bg-background-secondary flex items-center justify-center rounded-xl z-0 transition-transform duration-300 translate-x-[-110%] " + (active ? "translate-x-0" : '')} onClick={() => increaseItem(item)}>+</div>
                <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="goo">

                            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />

                            <feColorMatrix in="blur" mode="matrix" values="1  0  0  0  0
                                    0  1  0  0  0
                                    0  0  1  0  0
                                    0  0  0  25  -12" result="goo" />

                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />

                        </filter>
                    </defs>
                </svg>
            </div>
    )
}

export default AmountHandler
