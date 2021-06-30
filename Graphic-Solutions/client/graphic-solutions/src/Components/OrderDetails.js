import React, { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../Providers/OrdersProvider"
import "./Order.css"
import { useParams, useHistory } from "react-router-dom"

export const OrderDetail = () => {
  const { getById } = useContext(OrdersContext)
  const { deleteOrder } = useContext(OrdersContext)
	const [order, setOrder] = useState({}) //declaring our own state for single order

	const {Id} = useParams(); //pulls the orderId from the route to know which one to render
	//const history = useHistory();

  //if you want to print data, useEffect is where you want to do it
  useEffect(() => { // runs after every render
    console.log("useEffect", Id)
    getById(Id)
    .then((response) => {
      setOrder(response)
    })
    }, [])

    const history = useHistory()

    const handleDelete = () => {
    deleteOrder(order.id)
      .then(() => {
        history.push("/orders")
      })
  }

  return ( //the first time we render the component, we initlize the state
    <section className="order">
      <div className="order__quantity">Quantity: {order.quantity}</div>
      <div className="order__color">Color: {order.color}</div>
      <div className="order__style">Style: {order.style}</div>
      <div className="order__size">Size: {order.size}</div>
      <button onClick={handleDelete}>Delete Order</button>
      <button onClick={() => {
          history.push(`/orders/edit/${order.id}`)
        }}>Edit</button>
    </section>
  )
}