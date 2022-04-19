import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BowlOrderList from "../../Components/BowlOrderList/BowlOrderList";
import {OrderDetailsType} from "../../Components/BowlOrderDetail/BowlOrderDetail";
import { get } from "../../Utils/Request";
import Timer from "../../Components/Timer/Timer";

function BowlDetails() {

    let { id } = useParams<any>();
    const [bowl, setBowls] = useState<any>([]);
    const [orders, setOrders] = useState<OrderDetailsType[]>([]);

    useEffect(() => {
        get("/v1/bowls/" + id)
            .then(response => {
                setBowls(response.data)
        });

        get("/v1/bowls/" + id + '/orders')
            .then(response => {
                setOrders(response.data)
        });
    }, []);

      return (
        <div className={'flex flex-col w-full justify-center items-center'}>
            <div className={'flex flex-col md:flex-row justify-between w-3/4'}>
                <div className={'flex flex-col'}>
                    <h1 className={'text-4xl'}>{bowl.name}</h1>
                    <span>{bowl.description}</span>
                </div>
                <div className={'flex justify-between gap-5 mt-10 md:m-0 md:flex-col md:w-1/3'}>
                    <div>
                        <span>Order Deadline</span>
                        <Timer finishDate={bowl.orderDeadline} />
                    </div>
                    <div>
                        <span>Arrive Date</span>
                        <Timer finishDate={bowl.arriveDate} />
                    </div>
                </div>
            </div>
            <div className={'flex flex-col w-3/4 m-10'}>
                <BowlOrderList orders={orders}/>
            </div>
        </div>
      );
  }

export default BowlDetails;