import React, { useState, useContext, useRef } from 'react'
import { OrderItemProp } from '../../../../../Utils/Types'
import { BasketContext } from '../../../../../Context/BasketContext'
import Button from '../../../../../Components/Button/Button'

export type OrderItemInBasketContext = OrderItemProp & { basketIndex: number[] }

function OrderItem(props: { item: OrderItemInBasketContext }) {
    const inputElement = useRef<HTMLTextAreaElement | null>(null)
    const { addInformationToBasketItem } = useContext(BasketContext)
    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        <>
            <div
                className={
                    'flex flex-wrap justify-between mt-3 rounded w-full bg-gray-200'
                }
            >
                <div
                    className={'w-5/6 flex gap-2 flex-wrap justify-between p-2'}
                >
                    <span className={'break-all'}>{props.item.name}</span>
                    <span className={'break-all'}>{props.item.count}x</span>
                    <span className={'break-all text-right'}>
                        {props.item.price.toFixed(2)} €
                    </span>
                </div>
                <div
                    className={'flex items-center justify-center w-10'}
                    onClick={() => {
                        setEditMode(!editMode)
                    }}
                >
                    {!editMode ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    )}
                </div>
                {props.item.additionalInformation.length > 0 && !editMode && (
                    <div className={'w-full px-2 pb-2'}>
                        <span className={'w-full break-all italic'}>
                            {props.item.additionalInformation}
                        </span>
                    </div>
                )}
                {editMode && (
                    <div className="w-full px-3 pb-2">
                        <textarea
                            onFocus={(event) => {
                                const value = event.target.value
                                event.target.value = ''
                                event.target.value = value
                            }}
                            autoFocus
                            defaultValue={props.item.additionalInformation}
                            rows={2}
                            className={
                                'shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight focus:outline-none focus:shadow-outline'
                            }
                            ref={inputElement}
                        ></textarea>
                        <Button
                            variant="primary"
                            text="Add additional information"
                            type="button"
                            onClick={() => {
                                addInformationToBasketItem(
                                    props.item.basketIndex[0],
                                    inputElement.current?.value ?? ''
                                )
                                setEditMode(false)
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default OrderItem
