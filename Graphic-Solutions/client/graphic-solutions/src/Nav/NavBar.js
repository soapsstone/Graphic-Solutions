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
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            {isLoggedIn &&
              <li className="navbar__item">
                <NavLink tag={RRNavLink} to="/orders">Orders</NavLink>
              </li>
            }

              <li className="navbar__item">
                <NavLink tag={RRNavLink} to="/blank">Services Offerec</NavLink>
              </li>

            {isLoggedIn &&
              <li className="navbar__item">
                <NavLink tag={RRNavLink} to="/orders/add">Add Order</NavLink>
              </li>
            }


            <li className="navbar__item">
                   <a style={{ cursor: "pointer" }} onClick={logout} to="/">Logout</a>
            </li>
        </ul>

        
    )
}