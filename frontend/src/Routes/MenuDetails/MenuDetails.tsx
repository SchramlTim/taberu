import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { get } from '../../Utils/Request'
import { MenuItemProps, MenuProps } from '../../Utils/Types'
import ItemList from './ItemList/ItemList'

function MenuDetails() {
    let { id } = useParams<any>()
    const [menu, setMenu] = useState<MenuProps>()
    const [items, setItems] = useState<MenuItemProps[]>([])
    const [categories, setCategories] = useState<any[]>([])

    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + '/v1/menus/' + id).then(
            (response) => {
                setMenu(response.data)
            }
        )

        get(
            process.env.REACT_APP_API_ENDPOINT + '/v1/menus/' + id + '/items'
        ).then((response) => {
            setItems(response.data)
        })

        get(
            process.env.REACT_APP_API_ENDPOINT +
                '/v1/menus/' +
                id +
                '/categories'
        ).then((response) => {
            setCategories(response.data)
        })
    }, [])

    return (
        <div className={'flex flex-col w-full justify-center items-center'}>
            <div
                className={
                    'flex flex-col md:flex-row justify-between w-11/12 lg:w-3/4'
                }
            >
                <div className={'flex flex-col'}>
                    <h1 className={'text-4xl'}>{menu?.name}</h1>
                    <span>{menu?.description}</span>
                    <div className={'flex'}>
                        {categories.map((category: any) => (
                            <div className={'flex flex-col w-20'}>
                                <img src={category.iconUrl} />
                                <span className={'text-center'}>
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'flex flex-col w-11/12 lg:w-3/4 m-10'}>
                <ItemList items={items} />
            </div>
        </div>
    )
}

export default MenuDetails
