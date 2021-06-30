import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Order = ({ order }) => {
  return (
   
    <Card className="m-4">
      <p className="text-left px-2">To be decided title</p>
      <CardBody>
         <strong>{order.title}</strong>
          

      </CardBody>
    </Card>
  );
};

export default Order;