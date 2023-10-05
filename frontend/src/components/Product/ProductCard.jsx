import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    price,
    ratings,
    images,
    stock,
    numOfReviews,
    description,
  } = product;

  return (
    <>
      <Link className="product-card-link" to={`/product/${_id}`}>
        <motion.div
          whileHover={{
            translateY: -10,
            transition: { duration: 0.2 },
          }}
          className="product-card-main-container"
        >
          <img
            src={images[0].url}
            alt={`${name} image`}
            className="product-img"
          />
          <div className="product-details-container">
            <p className="product-name">{name}</p>
            <p className="product-desc">{description.slice(0, 80)}...</p>
            <div className="product-rating">
              <p>{ratings}</p>
              <span>
                <ReactStars
                  count={5}
                  value={ratings}
                  size={24}
                  isHalf={true}
                  activeColor="#f79d00"
                  color="#bbb"
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
        </motion.div>
      </Link>
    </>
  );
};

export default ProductCard;
