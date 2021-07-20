import React, { useContext, useEffect, useState } from "react"
import { ListGroup, ListGroupItem } from "reactstrap";
import { OrdersContext } from "../Providers/OrdersProvider"
import "./Order.css"
import { useParams, useHistory } from "react-router-dom"
import Order from "./Order"

export const OrderDetail = () => {
  const { getById, getOrderDetails, getSingleOrderDetail } = useContext(OrdersContext)
  const { deleteOrderDetail } = useContext(OrdersContext)
	const [order, setOrder] = useState({}) //declaring our own state for single order

	const {orderId} = useParams(); //pulls the orderId from the route to know which one to render
	//const history = useHistory();

  //if you want to print data, useEffect is where you want to do it
  useEffect(() => { // runs after every render
    console.log("useEffect", orderId)
    getOrderDetails(orderId)
    .then((response) => {
      setOrder(response)
    })
    }, [])

    const history = useHistory()

    const handleDelete = (orderObject) => {
    deleteOrderDetail(orderObject)
      .then(() => {
        history.push("/orders")
      })
  }

  return ( //the first time we render the component, we initlize the state
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-sm-12 col-lg-6">
            <Order order={order} />
            <ListGroup>
                {order.orderDetails?.map((order) => (    
                <section className="order">
                <div className="order__quantity">Quantity: {order.quantity}</div>
                <div className="order__color">Color: {order.color}</div>
                <div className="order__style">Style: {order.style}</div>
                <div className="order__size">Size: {order.size}</div>
                <button onClick={() => handleDelete(order)}>Delete Order Item</button>
                <button onClick={() => {
                    history.push(`/orderdetail/edit/${order.id}`)
                }}>Edit Order Item</button>
                </section>))}
            </ListGroup>
        </div>
      </div>
    </div>

  )
}