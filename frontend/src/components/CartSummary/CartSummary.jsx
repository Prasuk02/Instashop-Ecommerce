import React, { useEffect } from "react";
import "./CartSummary.css";
import { useSelector } from "react-redux";
import SafeCheckout from "../../assets/images/SafeCheckout.png"
import {RiSecurePaymentLine} from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
    const {cartItems} = useSelector((state) => state.cart)
    const navigate = useNavigate()

    let subtotal = cartItems.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.price)
    }, 0)
    let shippingCost = 50;
    let tax = ((subtotal + shippingCost) * (0.1/100))

  return (
    <div className="cartSummary-main-container">
      <div className="cartSummary-heading">
        <h1>Cart Summary</h1>
        <button>Edit</button>
      </div>

      <div className="cartSummary-data">
        <p>({cartItems.length}) Items</p>
        <div>
            <h6>Subtotal:</h6>
            <p>₹{subtotal}</p>
        </div>
        <div>
            <h6>Shipping:</h6>
            <p>₹{shippingCost}</p>
        </div>
        <div>
            <h6>Estimated Tax:</h6>
            <p>₹{Math.floor(tax)}</p>
        </div>
        <div className="cartSummary-total">
            <h4>Total Amount:</h4>
            <p>₹{Math.floor(subtotal + shippingCost + tax)}</p>
        </div>
      </div>


      {/* SECURE LINE */}
      <div className="cartSummary-secure-text">
        <div>
            <RiSecurePaymentLine style={{fontSize: '25px', color: '#099F4A'}}/>
            <p>Secure payment options</p>
        </div>
        <img src={SafeCheckout}/>

        <ul>
            <li>Easy Return within 7 days</li>
            <li>Fast Shipping</li>
            <li>Verified Sellers</li>
        </ul>

        <button onClick={() => {navigate("/products")}}>Back To Shopping</button>
      </div>
    </div>
  );
};

export default CartSummary;
