import React from "react";
import "./facility.css";
import { facilities } from "../../assets/content/facility";

const Facility = () => {
  return (
    <div className="facility-container">
      {facilities.map(({ img, heading, description }, key) => {
        return (
          <div className="facility-section">
            <img src={img} alt={`image-${key}`} className="facility-img" />
            <div>
              <h5>{heading}</h5>
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Facility;
