import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { get } from "../../Utils/Request";
import Timer from "../../Components/Timer/Timer";
import PlaceOrder from "./PlaceOrder/PlaceOrder";
import {BowlProps, MenuItemProps, OrderProps} from "../../Utils/Types";
import OrderList from "./OrderList/OrderList";
import OrderableItemList from "./OrderableItemList/OrderableItemList";
import {EditContext} from "../../Context/EditContext";
import {BasketProvider} from "../../Context/BasketContext";
import Button from '../../Components/Button/Button';

function BowlDetails() {

    let { id } = useParams<any>();
    const [bowl, setBowls] = useState<BowlProps>();
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);

    const {isEditMode, toggleEditMode} = useContext(EditContext)

    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/bowls/" + id)
            .then(response => {
                setBowls(response.data)
                get(response.data.orders)
                    .then(response => {
                        setOrders(response.data)
                    });
                get(process.env.REACT_APP_API_ENDPOINT + '/v1/menus/' + response.data.menuId + '/items')
                    .then(response => {
                        setMenuItems(response.data)
                    });
        });
    }, []);

    return (
    <div className={'flex flex-col w-full justify-center items-center'}>
            <div className={'flex flex-col md:flex-row justify-between w-3/4'}>
                <div className={'flex flex-col'}>
                    <div className='flex justify-between'>
                        <h1 className={'text-4xl'}>{bowl?.name}</h1>
                        <div className='w-1/4'>
                            <Button type='button' text='Edit' onClick={() => toggleEditMode()} />
                        </div>
                    </div>
                    <span>{bowl?.description}</span>
                </div>
                <div className={'flex justify-between gap-5 mt-10 md:m-0 md:flex-col md:w-1/3'}>
                    <div>
                        <span>Order Deadline</span>
                        <Timer finishDate={bowl?.orderDeadline ?? ''} />
                    </div>
                    <div>
                        <span>Arrive Date</span>
                            <Timer finishDate={bowl?.arriveDate ?? ''} />
                    </div>
                </div>
            </div>
            <div className={'flex flex-col justify-between w-3/4 mt-4'}>
                <h2>Menu</h2>
                <BasketProvider>
                    <OrderableItemList items={menuItems} />
                    {bowl &&
                        <div className={'w-full mt-3'}>
                            <PlaceOrder bowlId={bowl.id} />
                        </div>}
                </BasketProvider>
            </div>
            <div className={'flex flex-col w-3/4 m-10'}>
                <OrderList orders={orders}/>
            </div>
        </div>
    );
}

export default BowlDetails;
