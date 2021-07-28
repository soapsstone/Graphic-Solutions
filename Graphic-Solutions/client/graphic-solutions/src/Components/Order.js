import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Order = ({ order }) => {
  const history = useHistory();
  return (
   
    <Card className="m-4">
      <p className="text-left px-2">Order #{order.length}</p>
      <CardBody>
         <strong>{order.title}</strong>

         <>
              <button onClick={() => {
                history.push(`/delete/${order.id}`)
              }}>Delete Full Order</button>
              {/* <button onClick={() => {
                history.push(`/orderDetail/edit/${order.id}`)
              }}>Edit</button> */}
         </>
          

      </CardBody>
    </Card>
  );
};

export default Order;