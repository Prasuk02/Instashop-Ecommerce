import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({
  product: { name, price, ratings, images, stock, numOfReviews, description },
}) => {

  return (
    <>
      <Link className="product-card-link">
        <div className="product-card-main-container">
          <img
            src={images[0].url}
            alt={`${name} image`}
            className="product-img"
          />
          <div className="product-details-container">
            <p className="product-name">Timex</p>
            <p className="product-desc">
              {description.slice(0, 80)}...
            </p>
            <div className="product-rating">
              <p>{Number(ratings)}</p>
              <span>
                <ReactStars
                  count={5}
                  value={ratings}
                  size={24}
                  isHalf={true}
                  activeColor="#FFAF47"
                  edit={false}
                />
              </span>
              <p>({numOfReviews} reviews)</p>
            </div>
            <div className="product-price-container">
              <p className="product-price"> ₹ {price}</p>
              {stock <= 0 && <p className="out-of-stock">OUT OF STOCK</p>}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
