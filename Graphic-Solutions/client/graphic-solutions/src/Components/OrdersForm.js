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
  

const OrdersForm = () => {
    const {  addOrders, getById, getAllOrders, updateOrder } = useContext(OrdersContext)
    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("");
    
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */
    const [order, setOrder] = useState({});



    const history = useHistory();
        //wait for data before button is active
        const [isLoading, setIsLoading] = useState(true);

        const {orderId} = useParams();

    // Get categories.
    useEffect(() => {
          if (orderId){
            getAllOrders(orderId)
            .then(order => {
            
                setOrder(order)
                console.log(order)
                setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
        
      }, [])

    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newOrder = { ...order }
      //animal is an object with properties.
      //set the property to the new value
      newOrder[event.target.id] = event.target.value
      //update state
      setOrder(newOrder)
    }

    const currentUser = JSON.parse(sessionStorage.getItem("user")).id

    const handleSaveOrder = () => {
        console.log(currentUser)
        debugger
        //disable the button - no extra clicks
        setIsLoading(true);
        if (orderId){
          //PUT - update
          updateOrder({
              Id: order.id,
              Title: order.title,
              UserId: currentUser
          })
          //pushes a new entry onto the history stack
          .then(() => history.push(`/orders/${order.id}`))
        }else {
            debugger
          //POST - add
          addOrders({
              Title: order.title,
              UserId: currentUser
          })
          //pushes a new entry onto the history stack
          .then(() => history.push("/orders"))
        }
      }
    


    return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="Title" onChange={handleControlledInputChange} defaultValue={order?.title}/>
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup>
                    <Label for="title">Quantity:</Label>
                    <Input id="quantity" name="Quantity" onChange={handleControlledInputChange} defaultValue={order?.quantity}/>
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup>
                    <Label for="size">Size: </Label>
                    <Input id="size" name="Size" onChange={handleControlledInputChange} defaultValue={order?.size}/>
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup>
                    <Label for="style">Style: </Label>
                    <Input id="style" name="Style" onChange={handleControlledInputChange} defaultValue={order?.style}/>
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup>
                    <Label for="color">Color: </Label>
                    <Input id="color" name="Color" onChange={handleControlledInputChange} defaultValue={order?.color}/>
                  </FormGroup>
                </Form>
                
                <button className="btn btn-primary"
                  
                  onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSaveOrder()
                  }}>
                {orderId ? <>Save Order</> : <>Add Order</>}</button>
                <button onClick={()=>{history.push(`/orders`)}}>Cancel</button>
              </CardBody>
            </Card>
          </div>
        </div>
      );
};

export default OrdersForm;