import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Providers/UserProvider";
import ApplicationViews from "./Components/ApplicationViews";
import { OrdersProvider } from './Providers/OrdersProvider';
import { NavBar } from './Nav/NavBar';


function App() {
  return (
    <Router>
      <UserProvider>
        <OrdersProvider>
          <NavBar />
          <ApplicationViews />
        </OrdersProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
