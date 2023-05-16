import React, { useState, useEffect } from 'react';
import TextInput from '../../Components/TextInput/TextInput'
import {get, post} from "../../Utils/Request";
import Button from "../../Components/Button/Button";
import {MenuItemProps, MenuProps} from "../../Utils/Types";

function MenuCreate() {

    const [menuName, setMenuName] = useState('');
    const [menuDescription, setMenuDescription] = useState('');
    const [menu, setCreatedMenu] = useState<MenuProps|null>();
    const [menuItemName, setMenuItemName] = useState('');
    const [menuItemDescription, setMenuItemDescription] = useState('');
    const [menuItemPrice, setMenuItemPrice] = useState('');
    const [menuItems, setMenuItems] = useState<Array<MenuItemProps>>([]);

    const createMenu = async () => {
        const response = await post(process.env.REACT_APP_API_ENDPOINT + '/v1/menus', {
            name: menuName,
            description: menuDescription
        })
        setCreatedMenu(response.data)
    }

    const createMenuItem = async () => {
        await post(process.env.REACT_APP_API_ENDPOINT + '/v1/menus/' + menu?.id + '/items', {
            name: menuItemName,
            description: menuItemDescription,
            price: menuItemPrice
        })
        const response = await get(process.env.REACT_APP_API_ENDPOINT + '/v1/menus/' + menu?.id + '/items')
        setMenuItems(response.data)
    }

    if (menu) {
        return (
            <>
                <div className={'flex flex-col justify-center items-center w-full h-full'}>
                    <div className={'flex flex-col w-full max-w-[80%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                        <h2 className={'text-2xl'}>{menu.name}</h2>
                        <span>{menu.description}</span>
                    </div>
                    <div className={'flex flex-col gap-1 w-full max-w-[80%] mt-3'}>
                        {menuItems.map((item) => {
                            return (
                                <div key={item.id} className={'flex gap-2 flex-wrap justify-between p-2 rounded bg-gray-200 w-full'}>
                                    <span className={'w-1/3 break-all'}>{item.name}</span>
                                    <span className={'w-1/4 break-all text-right'}>{item.description}</span>
                                    <span className={'w-1/4 break-all text-gray-600 text-center'}>{item.price}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className={'w-full max-w-[80%] mt-3'}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            createMenuItem()
                        }} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                            <TextInput
                                title='Item Name'
                                placeholder='Item Name'
                                id='name'
                                type='text'
                                onChange={(e) => {setMenuItemName(e.target.value)}}
                            />
                            <TextInput
                                title='Description'
                                placeholder='Description'
                                id='description'
                                type='text'
                                onChange={(e) => {setMenuItemDescription(e.target.value)}}
                            />
                            <TextInput
                                title='Price'
                                placeholder='Price'
                                id='description'
                                type='text'
                                onChange={(e) => {setMenuItemPrice(e.target.value)}}
                            />
                            <div className={'flex items-center justify-between'}>
                                <Button variant="primary" type={'submit'} text={'Create Menu Item'} />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-[80%]'}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    createMenu()
                }} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <TextInput
                        title='Menu Name'
                        placeholder='Menu Name'
                        id='name'
                        type='text'
                        onChange={(e) => {setMenuName(e.target.value)}}
                    />
                    <TextInput
                        title='Description'
                        placeholder='Description'
                        id='description'
                        type='text'
                        onChange={(e) => {setMenuDescription(e.target.value)}}
                    />
                    <div className={'flex items-center justify-between'}>
                        <Button variant="primary" type={'submit'} text={'Create Menu'} />
                    </div>
                </form>
            </div>
        </div>
    );
  }

export default MenuCreate;