import React from 'react'
import "./OrderConfirmationPage.css"
import CartSummary from '../../components/CartSummary/CartSummary'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OrderConfirmationPage = () => {
    const {cartItems, shippingInfo} = useSelector((state) => state.cart)
    const navigate = useNavigate()

    const confirmOrderBtn = (e) => {
        e.preventDefault()

        let subtotal = cartItems.reduce((acc, curr) => {
            return acc + (curr.quantity * curr.price)
        }, 0)
        let shippingCost = 50;
        let tax = Math.floor((subtotal + shippingCost) * (0.1/100))

        const data = {
            subtotal,
            shippingCost,
            tax,
            totalPrice: subtotal + shippingCost + tax,
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate("/process/payment")
    }
  return (
    <div className='order-confirm-main-container'>
        <div className="order-confirm-container">
            <div className='order-details-container'>
                <h1>Order Details</h1>
                <div className="table-container">
                    <table>
                        <tr className='table-row-heading'>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price </th>
                            <th>Subtotal</th>
                        </tr>
                        {cartItems.map((item) => {
                            return <tr>
                                <td>
                                    <div className='table-product-name-container'>
                                        <img src={item?.image} alt={item?.name}/>
                                        <p>{item?.name}</p>
                                    </div>
                                </td>
                                <td>{item?.quantity}</td>
                                <td>{item?.price}</td>
                                <td>{item?.quantity * item?.price}</td>
                            </tr>
                        })}
                    </table>

                    <div className='order-confirm-shipping-details'>
                        <h4>Shipping Address</h4>
                        <p>{shippingInfo?.address}</p>
                        <p>{shippingInfo?.state}, {shippingInfo?.city}</p>
                        <p>{shippingInfo?.phoneNo}</p>
                    </div>
                </div>

                <button onClick={confirmOrderBtn}>PROCEED TO PAYMENT</button>
            </div>
            <div className="order-confirm-cart-summary">
                <CartSummary/>
            </div>
        </div>
    </div>
  )
}

export default OrderConfirmationPage