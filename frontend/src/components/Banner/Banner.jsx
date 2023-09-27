import React, { Fragment } from "react";
import homepageBanner from "../../assets/images/banners/homepageBanner.png";
import Blazer from "../../assets/images/banners/Blazer.png";
import { Typewriter } from "react-simple-typewriter";
import "./banner.css";

const Banner = () => {
  const typewriterWords = [
    "Clothes",
    "Watches",
    "Glasses",
    "Shoes",
    "Jewellery",
  ];
  return (
    <Fragment>
      <div className="banner-container">
        <img className="banner-bg-img" src={homepageBanner} alt="banner" />
        <div className="banner-content">
          <p className="banner-text">top sale on this week</p>
          <h2 className="banner-heading">
            explore amazing <br />
            fashionable{" "}
            <span className="banner-typewriter">
              <Typewriter
                words={typewriterWords}
                loop={0}
                cursor
                cursorStyle="|"
                cursorBlinking={1}
                typeSpeed={100}
                deleteSpeed={80}
                delaySpeed={2500}
              />
            </span>
            <br />
            this shadi season
          </h2>
          <button className="banner-btn">Shop Now</button>
        </div>
        <img src={Blazer} alt="banner-image" className="banner-img" />
      </div>
    </Fragment>
  );
};

export default Banner;
