import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import "./reviewCard.css";

const ReviewCard = ({data}) => {
  
  return (
    <div className="review-card-main-container">
      <div className="review-user-details">
        <img src={data.profileImg} />
        <p>{data.name}</p>
      </div>

      <div className="review-user-rating">
        <div>
          <p className="user-review-rating">{data.rating}.0</p>
          <span>
            <TiStarFullOutline />
          </span>
        </div>
        <p className="user-review-comment">{data.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
