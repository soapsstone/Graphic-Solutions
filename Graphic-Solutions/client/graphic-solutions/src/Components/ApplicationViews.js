import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import { OrdersProvider } from "../Providers/OrdersProvider"
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import OrderList from "./OrdersList";
import OrdersForm from "./OrdersForm";
import { OrderDetail } from "./OrderDetails";
import OrderDelete from "./OrderDelete";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Hello /> 
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>


        <OrdersProvider>

          <Route path="/orders" exact>
            {isLoggedIn ? <OrderList /> : <Redirect to="/login" />}
          </Route>

          <Route path="/orders/add">
            {isLoggedIn ? <OrdersForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/orders/:orderId(\d+)">
            {isLoggedIn ? <OrderDetail /> : <Redirect to="/login" />}
          </Route>

          <Route path="/delete/:id">
            <OrderDelete />
          </Route>

          <Route path="/orders/edit/:orderId(\d+)">
            {isLoggedIn ? <OrdersForm /> : <Redirect to="/login" />}
          </Route>

        </OrdersProvider>
      </Switch>
    </main>
  );
};