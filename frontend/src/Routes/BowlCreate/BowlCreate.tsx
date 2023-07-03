import React, { useState, useEffect } from 'react'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { get, post } from '../../Utils/Request'
import { Redirect } from 'react-router-dom'
import { BowlProps, MenuProps } from '../../Utils/Types'
import Form from '../../Components/Form/Form'
import { FormProvider } from '../../Context/FormContext'
import { validateNotEmpty } from '../../Utils/Validator'

function BowlCreate() {
    const [menus, setMenus] = useState<Array<MenuProps>>([])
    const [selectedMenu, selectMenu] = useState<MenuProps | null>(null)
    const [bowlName, setBowlName] = useState('')
    const [bowlDescription, setBowlDescription] = useState('')
    const [orderDeadline, setOrderDeadline] = useState('')
    const [arriveDate, setArriveDate] = useState('')
    const [bowl, setBowl] = useState<BowlProps | null>(null)

    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + '/v1/menus').then(
            (response) => {
                setMenus(response.data)
                selectMenu(response.data[0] ?? null)
            }
        )
    }, [])

    const afterBowlCreated = async (response: Response) => {
        const bowl = await response.json()
        setBowl(bowl.data)
    }

    if (bowl) {
        return <Redirect to={'/bowls/' + bowl.id} />
    }

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-xs'}>
                <FormProvider>
                    <Form
                        name={'create-bowl'}
                        method={'POST'}
                        action={
                            process.env.REACT_APP_API_ENDPOINT + '/v1/bowls'
                        }
                        afterSubmit={afterBowlCreated}
                        className={
                            'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                        }
                    >
                        <Input
                            required
                            title="Bowl Name"
                            placeholder="Bowl Name"
                            identifier="name"
                            type="text"
                            validation={(input) => validateNotEmpty(input)}
                        />
                        <Input
                            title="Description"
                            placeholder="Description"
                            identifier="description"
                            type="text"
                            validation={(input) => validateNotEmpty(input)}
                        />
                        <Input
                            title="Order Deadline"
                            placeholder="Order Deadline"
                            identifier="orderDeadline"
                            type="datetime-local"
                            validation={(input) => validateNotEmpty(input)}
                        />
                        <Input
                            title="Arrive Date"
                            placeholder="Arrive Date"
                            identifier="arriveDate"
                            type="datetime-local"
                            validation={(input) => validateNotEmpty(input)}
                        />
                        <div className={'mb-4'}>
                            <select
                                id={'menuId'}
                                className={
                                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                }
                            >
                                {menus.map((menu, index) => {
                                    return (
                                        <option key={menu.id} value={menu.id}>
                                            {menu.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={'flex items-center justify-between'}>
                            <Button
                                variant="primary"
                                type={'submit'}
                                text={'Create Bowl'}
                            />
                        </div>
                    </Form>
                </FormProvider>
            </div>
        </div>
    )
}

export default BowlCreate
