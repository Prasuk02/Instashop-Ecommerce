import React, { useState } from "react";
import "./LoginSignupPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AlertBox from "../../components/AlertBox/AlertBox";

const LoginSignupPage = () => {
  const [currentTab, setCurrentTab] = useState("login");

  const changeCurrentTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="login-signup-main-container">
      {/* <AlertBox/> */}
      <div className="login-signup-tab-container">
        {currentTab === "login" ? (
          <LoginPage changeCurrentTab={changeCurrentTab} />
        ) : (
          <SignupPage changeCurrentTab={changeCurrentTab} />
        )}
      </div>
    </div>
  );
};

export default LoginSignupPage;
