import React, { Fragment, useEffect, useState } from "react";
import "./productDetails.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productDetailActions";
import Loader from "../../components/layout/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { addItemToCart } from "../../actions/cartActions";

const productDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [productQuantity, setProductQauntity] = useState(1)

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  const handleAddToCart = () => {
    dispatch(addItemToCart(id, productQuantity))
  }

  const incProductQuantity = () => {
    if(productQuantity < 10){
      setProductQauntity(productQuantity + 1)
    }
  }

  const descProductQuantity = () => {
    if(productQuantity > 1){
      setProductQauntity(productQuantity - 1)
    }
  }

  const data = [{name: "Prasuk Jain",
  comment:
    "All of them are very awesome..... Thank you meesho for availing the products at very low price....And salute to your fast delivery also....Thank you Shadowfax...",
  rating: 4,
  profileImg:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
}, {name: "Prasuk Jain",
comment:
  "All of them are very awesome..... Thank you meesho for availing the products at very low price....And salute to your fast delivery also....Thank you Shadowfax...",
rating: 4,
profileImg:
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
}, {name: "Prasuk Jain",
comment:
  "All of them are very awesome..... Thank you meesho for availing the products at very low price....And salute to your fast delivery also....Thank you Shadowfax...",
rating: 4,
profileImg:
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
}, {name: "Prasuk Jain",
comment:
  "All of them are very awesome..... Thank you meesho for availing the products at very low price....And salute to your fast delivery also....Thank you Shadowfax...",
rating: 4,
profileImg:
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
}]

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="single-product-details-container">
            <div className="product-detail-path-container">
              <p className="product-detail-path">
                <span>Home</span> / <span>{product.category}</span> /{" "}
                <span>{product.name}</span>
              </p>

              <p className="product-detail-path-id">
                Product Id: {product._id}
              </p>
            </div>

            <div className="product-detail-data-container">
              <div className="product-detail-img-container">
                <div className="small-img-arr">
                  {product?.images?.map((img, key) => {
                    return (
                      <div>
                        <img src={img.url} alt={`img-${key}`} />
                      </div>
                    );
                  })}
                </div>
                <div className="big-img">
                  <img src={product.images?.[0]?.url} alt={`img`} />
                </div>
              </div>
              <div className="product-detail-data">
                <h1>{product.name}</h1>
                <p className="product-detail-price">₹{product.price}</p>
                <div className="product-detail-rating-container">
                  <ReactStars
                    count={5}
                    value={product.ratings}
                    size={24}
                    isHalf={true}
                    activeColor="#f79d00"
                    color="#bbb"
                    edit={false}
                  />
                  <p>( {product.numOfReviews} customer review )</p>
                </div>

                <h2 className="product-detail-desc-heading">Description : </h2>
                <p className="product-detail-desc">{product.description}</p>

                <div className="product-details-cart-btn-container">
                  <div className="product-inc-dec-btn">
                    <button onClick={descProductQuantity}>-</button>
                    <input readOnly value={productQuantity} type="number" />
                    <button onClick={incProductQuantity}>+</button>
                  </div>
                  <button onClick={handleAddToCart}>Add to cart</button>
                </div>
                <p className="product-detail-stock">Status: {product.stock > 0 ? <span className="product-detail-inStock">In Stock</span> : <span className="product-detail-outStock">Out Of Stock</span>}</p>

                <button className="product-detail-add-review-btn">Add a review</button>
              </div>
            </div>
          </div>

          <div className="product-details-review-container">
            <h2 className="product-details-review-heading">Product Ratings & Reviews</h2>
            <div className="product-details-review-map-container">
                {data.map((data) => {
                    return <ReviewCard data={data}/>
                })}

            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default productDetails;
