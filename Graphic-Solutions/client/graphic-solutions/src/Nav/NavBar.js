import React, {useContext, useState} from "react"
import { Link } from "react-router-dom"
import {UserContext } from "../Providers/UserProvider"
import { NavLink as RRNavLink } from "react-router-dom";
import "./NavBar.css"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';

export const NavBar = (props) => {
    const { isLoggedIn, logout } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
    <>
      <div>
        <div className="logo-image" position="static" >
          <img src='logo193.png'  />716 31st Street | Huntington, WV 25702 | Email: angela@gswv.net 
        </div>
        <hr></hr>

      <nav>
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
              <li className="navbar__item">
                <NavLink tag={RRNavLink} to="/blank">Services Offered</NavLink>
              </li>

              {isLoggedIn &&
              <li className="navbar__item">
                <NavLink tag={RRNavLink} to="/orders">Cart</NavLink>
              </li>
            }

            {isLoggedIn &&
              <li className="navbar__item">
                <NavLink tag={RRNavLink} to="/orders/add">Add Order</NavLink>
              </li>
            }


            <li className="navbar__item">
                   <a style={{ cursor: "pointer" }} onClick={logout} to="/">Logout</a>
            </li>
        </ul>
        </nav>
      </div>
      </>  
    )
}