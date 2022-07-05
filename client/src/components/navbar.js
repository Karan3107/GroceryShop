import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = (props) => {

  const {userDetail}= props;

  return (
    <>
      <nav className="top-bar topbar-responsive">
        <div className="top-bar-title">
          <NavLink className="topbar-responsive-logo" to="/">
            <strong className="top-bar-title">FARMHOUSE</strong>
          </NavLink>
        </div>
        <div id="topbar-responsive " className=" top-bar-right ">
          <div>
            <ul className="menu simple vertical medium-horizontal">
              <li>
                <NavLink
                  exact
                  activeClassName="active_class"
                  to="/"
                  className="nav-anchor"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="active_class"
                  to="/all-product"
                  className="nav-anchor"
                >
                  All Products
                </NavLink>
              </li>
              {props.isSeller && <li>
                <NavLink
                  exact
                  activeClassName="active_class"
                  to="/new-item"
                  className="nav-anchor"
                >
                  New Item
                </NavLink>
              </li>}
            </ul>
          </div>
        </div>
        <div className="topbar-responsive">
          <div className="user_detail " to="/myaccount">
            <p>Hii {props.isSeller ? userDetail.Seller_name : userDetail.Customer_name}</p>
            <ul className="dropdown-menu">
              {props.isCustomer && 
              <>
                <NavLink className="my_link" to="/my-cart">My Cart</NavLink>
                <NavLink className="my_link" to="/my-order">My Order</NavLink>
              </>
              }
              <NavLink className="my_link" to="/my-account">My Account</NavLink>
              <NavLink className="my_link" to="/login" onClick={()=>{props.setisLogin(false)}}>Logout</NavLink>
            </ul>
            </div>
          {props.isCustomer && 
          <>
          <NavLink className="cart_sec" to="/my-cart">
          <img className="cart_image" src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/000000/external-cart-supermarket-flatart-icons-solid-flatarticons.png"/>
          </NavLink>
          </>
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
