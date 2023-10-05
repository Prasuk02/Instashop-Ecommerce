import React from "react";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { TfiSearch } from "react-icons/tfi";
import "./sidebarContent.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAction";
import { Link } from "react-router-dom";

const SidebarContent = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleUserLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="nav-container-right">
      <h3 className="welcome-heading-sidebar">Welcome, User</h3>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">My Orders</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="nav-icons">
        <TfiSearch />
        <AiOutlineHeart />
        <BsCart4 />
        <div className="dropdown">
          <span>
            <RxPerson />
          </span>
          <div className="dropdown-content">
            <p className="dropdown-content-link">Dashboard</p>
            <p className="dropdown-content-link">My Profile</p>
            {isAuthenticated ? (
              <p onClick={handleUserLogout} className="dropdown-content-link">Logout</p>
            ) : (
              <Link to='/login' style={{textDecoration: 'none'}}>
                <p className="dropdown-content-link">Login</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
