import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from 'react-router-dom';

export const OrdersContext = React.createContext();

export const OrdersProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const { getToken } = useContext(UserContext);
  const history = useHistory();

  const getAllOrders = () =>
  getToken().then((token) =>  
   fetch("https://localhost:5001/api/orders", {
     method: "GET",
     headers: {
       Authorization: `Bearer ${token}`
     }
   }).then(res => res.json())
   .then(setOrders));

   const getById = (id) => {
    return getToken().then((token) => 
     fetch(`https://localhost:5001/api/orders/${id}`, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`
       }
     }).then((res) => res.json()))
  }

  const getOrderDetails = (id) => {
    return getToken().then((token) => 
     fetch(`https://localhost:5001/api/orders/getWithDetails/${id}`, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`
       }
     }).then((res) => res.json()))
  }


   // This function stores the userProfile object from sessionStorage is stored in a variable
   // and a fetch call is made to the api passing in the current user id
   const getOrdersByUserId = () => {
    let entireUser = JSON.parse(sessionStorage.getItem("user"))
    return getToken().then((token) => 
    fetch(`https://localhost:5001/api/orders/currentUser=${entireUser.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
    .then(setOrders));
  }

  const addOrders = (orders) => {
    return getToken().then((token) => 
      fetch("https://localhost:5001/api/orders", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify(orders),
     })
    )};

    const deleteOrder = orderId => {
      return getToken().then((token) =>
       fetch(`https://localhost:5001/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
    }

  return (
    <OrdersContext.Provider value={{ orders, getAllOrders, getOrdersByUserId, addOrders, getById, deleteOrder, getOrderDetails }}>
      {props.children}
    </OrdersContext.Provider>
  );
};