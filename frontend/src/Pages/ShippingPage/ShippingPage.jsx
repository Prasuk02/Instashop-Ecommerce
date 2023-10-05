import React, { useState } from "react";
import "./ShippingPage.css";
import {useDispatch, useSelector} from 'react-redux'
import CartSummary from "../../components/CartSummary/CartSummary";
import { saveShippingInformation } from "../../actions/cartActions";
const ShippingPage = () => {
    const [shippingDetails, setShippingDetails] = useState({})
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleShippingDetails = (e) => {
        setShippingDetails({...shippingDetails, [e.target.name]: e.target.value})
    }

    console.log(shippingDetails)
  return (
    <div className="shipping-page-main-container">
    {/* <h1>Shipping Details</h1> */}
      <div className="shipping-container">
        <div className="shipping-address-container">
            <h1>Shipping Address</h1>
            <div className="shipping-input-container">
                <div>
                    <p>Name:</p>
                    <input onChange={handleShippingDetails} readOnly className="shipping-input-field" type='text' placeholder="Name" name='name' value={user?.user?.name}/>
                </div>
                <div>
                    <p>Email:</p>
                    <input onChange={handleShippingDetails} readOnly className="shipping-input-field" type='text' placeholder="Email" name='email' value={user?.user?.email}/>
                </div>
            </div>
            <div className="shipping-input-container">
                <div>
                    <p>Address:</p>
                    <input onChange={handleShippingDetails} className="shipping-input-field" type='text' placeholder="Address" name='address'/>
                </div>
            </div>
            <div className="shipping-input-container">
                <div>
                    <p>Flat / Floor:</p>
                    <input onChange={handleShippingDetails} className="shipping-input-field" type='text' placeholder="Flat / Floor Number" name='flat'/>
                </div>
                <div>
                    <p>Landmark:</p>
                    <input onChange={handleShippingDetails} className="shipping-input-field" type='text' placeholder="Lankmark" name='landmark'/>
                </div>
            </div>
            <div className="shipping-input-container">
                <div>
                    <p>State:</p>
                    <input onChange={handleShippingDetails} className="shipping-input-field" type='text' placeholder="State" name='state'/>
                </div>
                <div>
                    <p>City:</p>
                    <input onChange={handleShippingDetails} className="shipping-input-field" type='text' placeholder="City" name='city'/>
                </div>
            </div>
            <div className="shipping-input-container">
                <div>
                    <p>Pincode:</p>
                    <input onChange={handleShippingDetails} className="shipping-input-field" type='text' placeholder="Pincode" name='pinCode'/>
                </div>
                <div>
                    <p>Phone Number:</p>
                    <input onChange={handleShippingDetails} className="shipping-input-field" type='text' placeholder="Phone Number" name='phoneNo'/>
                </div>
            </div>

            <button onClick={(e) => {
                e.preventDefault()
                dispatch(saveShippingInformation(shippingDetails))
                }}>Proceed to pay</button>
        </div>
        <div className="cart-summary-container">
            <CartSummary/>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;