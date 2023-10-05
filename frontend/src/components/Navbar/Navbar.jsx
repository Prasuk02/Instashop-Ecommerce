import React from "react";
import "./Navbar.css";
import ecomLogo from "../../assets/images/ecomLogo.png";
import { LiaBarsSolid } from "react-icons/lia";
import { changeSidebarStatus } from "../../actions/sidebarAction";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import SidebarContent from "../Sidebar/SidebarContent";

const Navbar = () => {
  const dispatch = useDispatch();
  const { sidebar } = useSelector((state) => state.sidebarStatus);

  return (
    <>
      {sidebar && <Sidebar />}
      <div className="nav-container">
        <LiaBarsSolid
          className="sidebar-icon"
          onClick={() => {
            dispatch(changeSidebarStatus());
          }}
        />
        
        <img className="nav-logo" src={ecomLogo} alt="logo" />

        <div className="navbar-right-main-container">
          <SidebarContent />
        </div>
        
      </div>
    </>
  );
};

export default Navbar;
