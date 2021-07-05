import React, { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../Providers/OrdersProvider";
import Order  from  "./Order";
import { Link, useHistory, useParams } from 'react-router-dom';

const OrderDelete = () => {
  const { orders, deleteOrder, getById} = useContext(OrdersContext);
  const [order, setOrder] = useState({});
  const history = useHistory();
  // const [post] = useState({});
  const {id} = useParams();

  useEffect(() => {
    getById(id).then(setOrder);
  }, []);

  const handleDelete = () => {
      debugger
    deleteOrder(orders.id)
      .then(() => {
        history.push("/orders")
      })
  }

  return (
    <div className="container">
      <p>Are you sure you want to delete your order?</p>
      <button onClick={handleDelete}>Confirm Delete</button>
      <button onClick={() => {
        history.push("/orders")
      }}>Cancel</button>
    </div>
  );
};

export default OrderDelete;