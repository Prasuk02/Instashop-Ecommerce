import React from "react";
import "./category.css";
import { categories } from "../../assets/content/category";

const Category = () => {
  return (
    <div className="category-container">
      {categories.map(({ img, categoryName }) => {
        return (
          <div className="category-section">
            <img src={img} alt="" className="category-img" />
            <div className="category-name">
                <h3>{categoryName}</h3>
                <a href="#">view all</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
