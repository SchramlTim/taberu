import { useContext, useEffect, useRef, useState } from 'react'
import { BasketContext } from '../../../../../Context/BasketContext'
import { MenuItemProps } from '../../../../../Utils/Types'

function AmountHandler(props: { item: MenuItemProps }) {
    const [active, toggle] = useState(false)
    const [interactionCount, setInteractionCount] = useState(0)
    const { basketItems, increaseItem, reduceItem } = useContext(BasketContext)
    const item = props.item

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            toggle(false)
        }, 1500)
        return () => clearTimeout(timeoutId)
    }, [active, interactionCount])

    const basketItem = basketItems.find(
        (listItem) => listItem.id === item.id
    )

    return (
        <div
            className={
                (active ? 'translate-x-0' : 'translate-x-[30%]') +
                ' flex transition-all items-center justify-end font-bold gap-1 mr-1 flex-end [filter:url(#goo)]'
            }
        >
            <div
                className={
                    'h-8 w-10 bg-background-secondary flex items-center justify-center rounded-xl z-0 transition-transform duration-300 translate-x-[110%] ' +
                    (active ? '!translate-x-0' : '')
                }
                onClick={() => {
                    reduceItem(item)
                    setInteractionCount(interactionCount + 1)
                    if (basketItem && basketItem.count <= 1) {
                        toggle(false)
                    }
                }}
            >
                -
            </div>
            <span
                className={
                    'flex items-center justify-center w-12 h-12 bg-background-secondary rounded-full text-center z-10'
                }
                onClick={() => {
                    if (!basketItem) {
                        increaseItem(item)
                        return
                    }
                    toggle(!active)
                }}
            >
                {basketItem ? basketItem.count : '+'}
            </span>
            <div
                className={
                    'h-8 w-10 bg-background-secondary flex items-center justify-center rounded-xl z-0 transition-transform duration-300 translate-x-[-110%] ' +
                    (active ? '!translate-x-0' : '')
                }
                onClick={() => {
                    increaseItem(item)
                    setInteractionCount(interactionCount + 1)
                }}
            >
                +
            </div>
            <svg
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="7"
                            result="blur"
                        />

                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1  0  0  0  0
                                    0  1  0  0  0
                                    0  0  1  0  0
                                    0  0  0  25  -12"
                            result="goo"
                        />

                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}

export default AmountHandler
