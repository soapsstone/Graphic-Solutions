import React, { useContext, useEffect, useState} from "react"
import { OrdersContext } from "../Providers/OrdersProvider";
import Order from "./Order";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
  } from "reactstrap";
  

const OrderDetailForm = () => {
    const {  addOrderDetail, getById, getOrderDetails, updateOrder, getSingleOrderDetail, deleteOrder } = useContext(OrdersContext)
    // const [quantity] = useState("");
    // const [color] = useState("");
    // const [style] = useState("");
    // const [size] = useState("");
    
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */
    const [order, setOrder] = useState({});
    const [orderDetails, setOrderDetails] = useState({});



    const history = useHistory();
        //wait for data before button is active
        const [isLoading, setIsLoading] = useState(true);

        const {orderId} = useParams();

    // Get categories.
    useEffect(() => {

      getById(orderId)
      .then(newOrder => {
        setOrder(newOrder)
        if (orderId != newOrder.id || order.id === null ){
          getSingleOrderDetail(orderId)
          .then(orderDetails => {
          
              setOrderDetails(orderDetails)
              console.log(orderDetails)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
        
       
      }, [])

    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newOrder = { ...orderDetails }
      //animal is an object with properties.
      //set the property to the new value
      newOrder[event.target.id] = event.target.value
      //update state
      setOrderDetails(newOrder)
    }

    const currentUser = JSON.parse(sessionStorage.getItem("user")).id

    const handleSaveOrderDetail = () => {
        console.log(currentUser)
        //disable the button - no extra clicks
        setIsLoading(true);
        if (+orderId !== order.id){
          //PUT - update
          updateOrder({
              Id: orderDetails.id,
              OrderId: parseInt(orderDetails.orderId),
              Quantity: orderDetails.quantity,
              Color: orderDetails.color,
              Style: orderDetails.style,
              Size: orderDetails.size
          })
          //pushes a new entry onto the history stack
          .then(() => history.push(`/orders/${orderDetails.orderId}`))
        }else {
          //POST - add
          addOrderDetail({
              OrderId: +orderId,
              Quantity: orderDetails.quantity,
              Color: orderDetails.color,
              Style: orderDetails.style,
              Size: orderDetails.size
          })
          //pushes a new entry onto the history stack
          .then(() => history.push("/orders"))
        }
      }

      const handleDelete = () => {
        deleteOrder(order.id)
          .then(() => {
            history.push("/orders")
          })
      }
    


    return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                {/* <Form>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="Title" onChange={handleControlledInputChange} defaultValue={orderDetails?.title}/>
                  </FormGroup>
                </Form> */}
                <Form>
                  <FormGroup>
                    <Label for="title">Quantity:</Label>
                    <Input id="quantity" name="Quantity" onChange={handleControlledInputChange} defaultValue={orderDetails?.quantity}/>
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup>
                    <Label for="size">Size: </Label>
                    <Input id="size" name="Size" onChange={handleControlledInputChange} defaultValue={orderDetails?.size}/>
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup>
                    <Label for="style">Style: </Label>
                    <Input id="style" name="Style" onChange={handleControlledInputChange} defaultValue={orderDetails?.style}/>
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup>
                    <Label for="color">Color: </Label>
                    <Input id="color" name="Color" onChange={handleControlledInputChange} defaultValue={orderDetails?.color}/>
                  </FormGroup>
                </Form>
                <button onClick={handleDelete}>Delete Order</button>
                <button className="btn btn-primary"
                  
                  onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSaveOrderDetail()
                  }}>
                {orderId ? <>Save Order</> : <>Add Order</>}</button>
                <button onClick={()=>{history.push(`/orders`)}}>Cancel</button>
              </CardBody>
            </Card>
          </div>
        </div>
      );
};

export default OrderDetailForm;