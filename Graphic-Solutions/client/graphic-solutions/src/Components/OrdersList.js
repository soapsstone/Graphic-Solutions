import React, { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../Providers/OrdersProvider";
import Order  from  "./Order"
import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const OrderList = () => {
  const { orders, getAllOrders} = useContext(OrdersContext);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {orders.map((order) => (
            <>
            <Order key={order.id} order={order} />
            <Link to={`/orders/${order.id}`}>Order Details</Link>
            </>
          ))}
          
        </div>
      </div>

    </div>
  );
};

export default OrderList;