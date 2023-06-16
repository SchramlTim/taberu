import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { get } from "../../Utils/Request";
import Timer from "../../Components/Timer/Timer";
import PlaceOrder from "./PlaceOrder/PlaceOrder";
import {BowlProps, MenuItemProps, OrderProps} from "../../Utils/Types";
import OrderList, { LoadingOrderList } from "./OrderList/OrderList";
import OrderableItemList, { LoadingOrderableItemList } from "./OrderableItemList/OrderableItemList";
import {BasketContext, BasketProvider} from "../../Context/BasketContext";
import { UserContext } from '../../Context/UserContext';
import { BowlProvider } from '../../Context/BowlContext';

function BowlDetails() {

    const { id } = useParams<any>();
    const [bowl, setBowls] = useState<BowlProps>();
    const [orders, setOrders] = useState<OrderProps[] | undefined>();
    const [menuItems, setMenuItems] = useState<MenuItemProps[] | undefined>();
    const { user } = useContext(UserContext);

    useEffect(() => {
        get(process.env.REACT_APP_API_ENDPOINT + "/v1/bowls/" + id)
            .then(response => {
                setBowls(response.data)
                get(response.data.orders)
                    .then(response => {
                        setOrders(response.data ?? [])
                    });
                get(process.env.REACT_APP_API_ENDPOINT + '/v1/menus/' + response.data.menuId + '/items')
                    .then(response => {
                        setMenuItems(response.data ?? [])
                    });
        });
    }, []);

    return (
        <BowlProvider value={{bowl}} >
            <div className={'flex flex-col w-full justify-center items-center'}>
                <div className={'flex flex-col md:flex-row justify-between w-11/12 lg:w-3/4'}>
                    <div className={'flex flex-col w-full pr-5 gap-2'}>
                        <div className='flex justify-between'>
                            {!bowl ? <LoadingTitle/> : <h1 className={'text-4xl'}>{bowl?.name}</h1>}
                            {bowl?.creatorId === user?.id && <span>(Owner)</span>}
                        </div>
                        {!bowl ? <LoadingDescription/> : <span className={'h-16'}>{bowl?.description}</span>}
                    </div>
                    <div className={'flex justify-between gap-5 mt-10 md:m-0 md:flex-col md:w-1/3'}>
                        <div className={'flex flex-col items-start'}>
                            <span>Order Deadline</span>
                            <Timer finishDate={bowl?.orderDeadline} />
                        </div>
                        <div className={'flex flex-col items-start'}>
                            <span>Arrive Date</span>
                            <Timer finishDate={bowl?.arriveDate} />
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col justify-between gap-3 w-11/12 lg:w-3/4 mt-4'}>
                    <h2 className={'text-2xl'}>Menu</h2>
                    <BasketProvider>
                        {!menuItems ? <LoadingOrderableItemList/> : <OrderableItemList items={menuItems} />}
                    </BasketProvider>
                </div>
                <div className={'flex flex-col w-11/12 lg:w-3/4 m-10'}>
                    {!orders ? <LoadingOrderList/> : <OrderList orders={orders}/>}
                </div>
            </div>
        </BowlProvider>
    );
}

function LoadingTitle() {
    return (<span className={'text-2xl w-full flex animate-pulse'}><span className={'bg-gray-300 w-3/4 h-10 rounded-lg'}></span></span>)
}

function LoadingDescription() {
    return (<span className={'text-2xl w-full flex animate-pulse'}><span className={'bg-gray-300 w-full h-16 rounded-lg'}></span></span>)
}

export default BowlDetails;
