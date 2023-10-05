import React, { useState } from "react";
import "./CartItemCard.css";
import {useDispatch} from 'react-redux'
import { RemoveProductFromCart, updateQuantityInCart } from "../../actions/cartActions";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch()
  const { image, name, price, product, quantity, stock } = item;
  const [productQuantity, setProductQauntity] = useState(quantity)

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

  return (
    <div className="cart-item-container">
      <div className="cart-img-container">
        <img src={image} />
      </div>
      <div className="cart-data-container">
        <p className="name">{name}</p>
        <p className="price">
          {" "}
          <span>₹</span>
          {price}
        </p>
        <div className="updateQuantity-container">
          <div className="quantity-inc-dec-btn">
            <button onClick={descProductQuantity}>-</button>
            <input readOnly value={productQuantity} type="number" />
            <button onClick={incProductQuantity}>+</button>
          </div>
          {quantity !== productQuantity &&
            <button onClick={() => dispatch(updateQuantityInCart(product, productQuantity))}>Update</button>
          }
        </div>
        <p className="stock">
          {stock >= productQuantity ? <span className="product-detail-inStock">In Stock</span> : <span className="product-detail-outStock">Out Of Stock</span>}
        </p>
      </div>
      <div className="subtotal-container">
        <div>
          <p className="heading">Subtotal:</p>
          <p className="subtotal">{productQuantity * price} /-</p>
        </div>
        <button className="remove-btn" onClick={() => dispatch(RemoveProductFromCart(product))}>remove</button>
      </div>
    </div>
  );
};

export default CartItemCard;
