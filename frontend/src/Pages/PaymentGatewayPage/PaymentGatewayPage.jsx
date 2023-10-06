import React, { useEffect, useRef, useState } from "react";
import "./PaymentGatewayPage.css";
import { useDispatch, useSelector } from "react-redux";
import CartSummary from "../../components/CartSummary/CartSummary";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  confirmPaymentWithStripe,
  payWithStripe,
} from "../../actions/paymentActions";
import { createOrder } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentGatewayPage = (props) => {
  const { user } = useSelector((state) => state.user);
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCost,
    totalPrice: orderInfo.totalPrice,
  };

  const paymentData = {
    amount: Math.floor(orderInfo.totalPrice * 100),
  };

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    order.paymentInfo = {
      id: "#",
      status: "success",
    };

    dispatch(createOrder(order))

    navigate("/success")
    
    // try {
    //   const config = {
    //     headers: {
    //      " Authorization":
    //       "Bearer sk_test_51NxmnCSJ9gNFiMMFIOOYmgdvVCv9Eie0gh9YEYqoaPM0DtgVC2pqtFnddR21xyftwxcioOwyYHbTy0zKHRC1l0Sz00ThJnl0td",
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const { data } = await axios.post(
    //     `/api/v1/payment/process`,
    //     config
    //   );
    //   console.log("DATA: ", data);

    //   const client_secret = data.client_secret;

    //   if (!stripe || !elements) return;

    //   const result = await stripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: elements.getElement(CardNumberElement),
    //       billing_details: {
    //         name: user.name,
    //         email: user.email,
    //         address: {
    //           line1: shippingInfo.address,
    //           city: shippingInfo.city,
    //           state: shippingInfo.state,
    //           postal_code: shippingInfo.pinCode,
    //           country: shippingInfo.country,
    //         },
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     payBtn.current.disabled = false;

    //     console.log(result.error.message);
    //   } else {
    //     if (result.paymentIntent.status === "succeeded") {
    //       order.paymentInfo = {
    //         id: result.paymentIntent.id,
    //         status: result.paymentIntent.status,
    //       };

    //       dispatch(createOrder(order));

    //       history.push("/success");
    //     } else {
    //       console.log("There's some issue while processing payment ");
    //     }
    //   }
    // } catch (error) {
    //   payBtn.current.disabled = false;
    //   console.log(error);
    // }
  };

  return (
    <div className="payment-gateway-main-container">
      <div className="payment-page-container">
        <div className="payment-gateway-form-container">
          <h1>Payment Gateway</h1>
          <form className="payment-form">
            <div>
              <div className="pay-page-input-field">
                <p>Name</p>
                <input
                  readOnly
                  type="text"
                  name="name"
                  value={user?.user?.name}
                />
              </div>
              <div className="pay-page-input-field">
                <p>Email</p>
                <input
                  readOnly
                  type="text"
                  name="email"
                  value={user?.user?.email}
                />
              </div>
            </div>

            <div>
              <div className="pay-page-input-field">
                <p>Card Number</p>
                <div className="InputElement">
                  <CardNumberElement />
                </div>
              </div>
              <div className="pay-page-input-field">
                <p>Cardholder's Name</p>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Cardholder's Name"
                />
              </div>
            </div>

            <div>
              <div className="pay-page-input-field">
                <p>Expiry</p>
                <div className="InputElement">
                  <CardExpiryElement />
                </div>
              </div>
              <div className="pay-page-input-field">
                <p>CVC</p>
                <div className="InputElement">
                  <CardCvcElement />
                </div>
              </div>
            </div>

            <ul>
              <li>All types of cards accepted.</li>
              <li>
                <span>Stripe</span> is used as payment partner for secure online
                payment processing.
              </li>
              <li>
                By continuing with your payment, you are agreeing to our privacy
                policy and terms of services.
              </li>
            </ul>

            <button ref={payBtn} onClick={paymentSubmitHandler}>
              Pay Now
            </button>
          </form>
        </div>

        <div className="payment-page-cart-summary">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayPage;
