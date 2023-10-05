import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import './loader.css'

const Loader = () => {
  return (
    <div className="loader-main-container">
      <div className="loader">
        <MagnifyingGlass
          visible={true}
          height="100"
          width="100"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    </div>
  );
};

export default Loader;
