import React, { useState } from "react";
import "./LoginPage.css";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../actions/userAction";

const SignupPage = ({ changeCurrentTab }) => {
  const [signupCredentials, setSignupCredentials] = useState({});
  const [previewImg, setPreviewImg] = useState();
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    if (e.target.type == "file") {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSignupCredentials({
            ...signupCredentials,
            [e.target.name]: reader.result,
          });
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      return;
    }
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
  };

  console.log(signupCredentials);
  return (
    <div className="login-container">
      <form>
        <h1>Create New Account</h1>

        <div className="signup-name-email-box">
          <div className="input-field">
            <input
              onChange={handleSignup}
              type="name"
              placeholder="Name"
              className="input"
              name="name"
            />
          </div>
          <div className="input-field">
            <input
              onChange={handleSignup}
              type="email"
              placeholder="Email"
              className="input"
              name="email"
            />
          </div>
        </div>
        <div className="input-field">
          <input
            onChange={handleSignup}
            type="password"
            placeholder="Password"
            className="password"
            name="password"
          />
          <i className="bx bx-hide eye-icon"></i>
        </div>
        <div className="input-field">
          <input
            onChange={handleSignup}
            type="password"
            placeholder="Confirm Password"
            className="password"
            name="confirmPassword"
          />
          <i className="bx bx-hide eye-icon"></i>
        </div>

        <div className="signup-avatar-container">
          <Avatar
            alt={signupCredentials?.name}
            onChange={handleSignup}
            src={previewImg}
            sx={{
              width: "80px",
              height: "80px",
              fontSize: "40px",
              border: "1px solid #ddd",
            }}
            className="update-profile-avatar"
          />

          <label className="upload-img-text" htmlFor="upload">
            Upload Profile Pic
          </label>
          <input
            onChange={handleSignup}
            className="upload-img"
            accept="image/*"
            id="upload"
            type="file"
            name="avatar"
          />
        </div>

        <button
          className="login-btn"
          onClick={(e) => {
            e.preventDefault();
            dispatch(createNewUser(signupCredentials));
          }}
        >
          Create New Account
        </button>
      </form>
      <p className="signup-form-link">
        Already have an account?{" "}
        <span
          onClick={() => {
            changeCurrentTab("login");
          }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupPage;
