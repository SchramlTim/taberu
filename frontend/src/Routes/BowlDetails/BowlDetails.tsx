import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getData } from "../../Components/Utils/GetData";
import BowlOrderList from "../../Components/BowlOrderList/BowlOrderList";
import {OrderDetailsType} from "../../Components/BowlOrderDetail/BowlOrderDetail";

function BowlDetails() {

    let { id } = useParams<any>();
    const [bowl, setBowls] = useState<any>([]);
    const [orders, setOrders] = useState<OrderDetailsType[]>([]);

    useEffect(() => {
        getData("/v1/bowls/" + id)
            .then(response => {
                setBowls(response.data)
        });

        getData("/v1/bowls/" + id + '/orders')
            .then(response => {
                setOrders(response.data)
        });
    }, []);

      return (
        <div className={'flex flex-col w-full justify-center items-center'}>
            <div className={'flex flex-col w-3/4'}>
                <span>{bowl.name}</span>
                <span>{bowl.description}</span>
                <span>{bowl.orderDeadline}</span>
                <span>{bowl.arriveDate}</span>
                <div>
                    <BowlOrderList orders={orders}/>
                </div>
            </div>
        </div>
      );
  }

export default BowlDetails;