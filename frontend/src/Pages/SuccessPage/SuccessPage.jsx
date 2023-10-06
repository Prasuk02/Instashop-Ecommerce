import React from 'react'
import "./SuccessPage.css"
import { useSelector } from 'react-redux'
import van from "../../assets/images/facility/van.png"

const SuccessPage = () => {
    const {user} = useSelector((state) => state.user)
    const {order} = useSelector((state) => state.newOrder)
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  return (
    <div className='success-page-main-container'>
        <div className="success-page-data-container">
            <div className='success-page-heading-container'>
                <div className='heading-data'>
                    <h1>Thank you, {user?.user?.name}</h1>
                    <p>Order_id: {order._id}</p>
                </div>
                <div className="success-page-van-img">
                    <img src={van}/>
                </div>
            </div>
            <p className='dispatch-statement'>Your order has been confirmed and ready for dispatch. we are delivering you order.</p>

            <div className='line'></div>

            <div className='success-page-user-address'>
                <h6>Delivering At:</h6>
                <p>{shippingInfo?.address}</p>
                <p>{shippingInfo?.city}, {shippingInfo?.pinCode}</p>
            </div>

            <div className='success-page-payment-status'>
                <p>Payment Status: <span>Paid</span></p>
            </div>
        </div>
    </div>
  )
}

export default SuccessPage