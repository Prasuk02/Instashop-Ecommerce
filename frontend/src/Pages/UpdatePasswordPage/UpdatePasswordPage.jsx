import React, { useState, useEffect } from "react";
import "./UpdatePasswordPage.css"
import { updateUserPassword } from "../../actions/updateUserActions";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const UpdatePasswordPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {updateStatus, loading} = useSelector((state) => state.updateUser)
  const [passwordDetails, setPasswordDetails] = useState({});

  const handlePasswordDetails = (e) => {
    setPasswordDetails({...passwordDetails, [e.target.name]: e.target.value})
  };

  const updatePassword = (e) => {
    e.preventDefault()
    dispatch(updateUserPassword(passwordDetails))

  }

  useEffect(() => {
    if(!loading && updateStatus){
      navigate('/account')
    }
  }, [loading, updateStatus])

  return (
    <div className="update-password-main-container">
      <div className="update-password-container">
          <p className="update-password-heading">Change Password</p>

          <div className="update-password-stack">
            <p>Old Password:</p>
            <input
              onChange={handlePasswordDetails}
              type="password"
              placeholder="Old Password"
              name="oldPassword"
            />
          </div>

          <div className="update-password-stack">
            <p>New Password:</p>
            <input
              onChange={handlePasswordDetails}
              type="password"
              placeholder="New Password"
              name="newPassword"
            />
          </div>

          <div className="update-password-stack">
            <p>Confirm Password:</p>
            <input
              onChange={handlePasswordDetails}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </div>

          <button className="update-password-btn" onClick={updatePassword}>Change password</button>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
