import React, { useState, useEffect } from 'react';
import TextInput from '../../Components/TextInput/TextInput'
import Button from "../../Components/Button/Button";
import {get, post} from "../../Utils/Request";
import {Redirect} from "react-router-dom";
import {BowlProps, MenuProps} from "../../Utils/Types";


function BowlCreate() {

    const [menus, setMenus] = useState<Array<MenuProps>>([])
    const [selectedMenu, selectMenu] = useState<MenuProps|null>(null)
    const [bowlName, setBowlName] = useState('')
    const [bowlDescription, setBowlDescription] = useState('')
    const [orderDeadline, setOrderDeadline] = useState('')
    const [arriveDate, setArriveDate] = useState('')
    const [bowl, setBowl] = useState<BowlProps|null>(null)

    useEffect(() => {
        get('/v1/menus')
            .then(response => {
                setMenus(response.data)
                selectMenu(response.data[0] ?? null)
            });
    }, [])

    const createBowl = (e: any) => {
        e.preventDefault()
        if (selectedMenu) {
            post('/v1/bowls', {
                name: bowlName,
                description: bowlDescription,
                orderDeadline,
                arriveDate,
                menuId: selectedMenu.id
            }).then((response) => {
                setBowl(response.data)
            })
        }
    }

    if (bowl) {
        return <Redirect to={'/bowls/' + bowl.id}/>
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-[80%]'}>
                <form onSubmit={createBowl} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <TextInput
                        title='Bowl Name'
                        placeholder='Bowl Name'
                        id='bowlname'
                        type='text'
                        onChange={(e) => {setBowlName(e.target.value)}}
                    />
                    <TextInput
                        title='Description'
                        placeholder='Description'
                        id='description'
                        type='text'
                        onChange={(e) => {setBowlDescription(e.target.value)}}
                    />
                    <TextInput
                        title='Order Deadline'
                        placeholder='Order Deadline'
                        id='orderDateline'
                        type='datetime-local'
                        onChange={(e) => {setOrderDeadline(e.target.value)}}
                    />
                    <TextInput
                        title='Arrive Date'
                        placeholder='Arrive Date'
                        id='arriveDate'
                        type='datetime-local'
                        onChange={(e) => {setArriveDate(e.target.value)}}
                    />
                    <div className={"mb-4"}>
                        <select onChange={(e) => {
                            const selectedMenuId = e.target.options[e.target.selectedIndex].value;
                            const menu = menus.filter((menu) => parseInt(menu.id) === parseInt(selectedMenuId)).pop()
                            selectMenu(menu ?? null)
                        }} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}>
                            {menus.map((menu, index) => {
                                return <option key={menu.id} value={menu.id}>{menu.name}</option>
                            })}
                        </select>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <Button type={'submit'} text={'Create Bowl'} />
                    </div>
                </form>
            </div>
        </div>
    );
  }

export default BowlCreate;