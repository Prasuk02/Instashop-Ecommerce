import React, { useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { user: userData } = user;

  // useEffect(() => {
  //     if(!isAuthenticated){
  //         navigate("/login")
  //     }
  // }, [])

  return (
    <div className="profile-page-main-container">
      <div className="profile-data-container">
        <div className="profile-page-user-data">
          <p className="user-name">{userData?.name}</p>
          <p className="user-email">{userData?.email}</p>
          <Avatar
            alt={userData?.name}
            src={userData?.avatar?.url}
            sx={{ width: "130px", height: "130px", fontSize: "60px" }}
            className="profile-avatar"
          />
          <Link to="/my-orders">
            <button className="editBtn">EDIT PROFILE</button>
          </Link>
          <Link to="/my-orders">
            <button className="myOrder-btn">My Orders</button>
          </Link>
          <p className="user-changePass">Change Password</p>
          <p className="user-joined-date">
            Member from: <span>26 september 2023</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
