import React from 'react'
import "./OrderConfirmationPage.css"
import CartSummary from '../../components/CartSummary/CartSummary'
import { useSelector } from 'react-redux'

const OrderConfirmationPage = () => {
    const {cartItems, shippingInfo} = useSelector((state) => state.cart)
    console.log(cartItems)
  return (
    <div className='order-confirm-main-container'>
        <div className="order-confirm-container">
            <div className='order-details-container'>
                <h1>Order Details</h1>
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

                <button>Confirm Order</button>
            </div>
            <div className="order-confirm-cart-summary">
                <CartSummary/>
            </div>
        </div>
    </div>
  )
}

export default OrderConfirmationPage