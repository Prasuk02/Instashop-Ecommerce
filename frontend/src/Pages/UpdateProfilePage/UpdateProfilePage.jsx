import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import "./UpdateProfilePage.css";
import Loader from "../../components/layout/Loader";
import { updateUserDetails } from "../../actions/updateUserActions";

const UpdateProfilePage = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { user: userData } = user;
  const [updateDetails, setUpdateDetails] = useState(userData);
  const [previewImg, setPreviewImg] = useState(userData?.avatar?.url);

  const handleUpdateProfileData = (e) => {
    if (e.target.type == "file") {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setUpdateDetails({
            ...updateDetails,
            [e.target.name]: reader.result,
          });
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      return;
    }
    setUpdateDetails({
      ...updateDetails,
      [e.target.name]: e.target.value,
    });
  };
  console.log(updateDetails);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="update-profile-page-main-container">
          <div className="update-profile-data-container">
            <div className="update-profile-page-user-data">
              <p className="update-heading">EDIT PROFILE</p>

              <Avatar
                alt={userData?.name}
                onChange={handleUpdateProfileData}
                src={previewImg}
                sx={{ width: "130px", height: "130px", fontSize: "60px" }}
                className="update-profile-avatar"
              />
              <label className="upload-img-text" htmlFor="upload">
                {updateDetails?.url?.name || "Upload Profile Pic"}
              </label>
              <input
                onChange={handleUpdateProfileData}
                className="upload-img"
                accept="image/*"
                id="upload"
                type="file"
                name="avatar"
              />

              <div className="update-data-stack">
                <p>Name:</p>
                <input
                  onChange={handleUpdateProfileData}
                  type="text"
                  placeholder="Name"
                  value={updateDetails?.name}
                  name="name"
                />
              </div>

              <div className="update-data-stack">
                <p>Email:</p>
                <input
                  onChange={handleUpdateProfileData}
                  type="email"
                  placeholder="Email"
                  value={updateDetails?.email}
                  name="email"
                />
              </div>

              <button onClick={() => {dispatch(updateUserDetails(updateDetails))}} className="update-profile-btn">Update profile</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfilePage;
