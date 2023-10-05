import React, { useState } from 'react'
import "./CartPage.css"
import CartItemCard from './CartItemCard'
import CartSummary from '../../components/CartSummary/CartSummary'
import { useSelector } from 'react-redux'

const CartPage = () => {
  const {cartItems} = useSelector((state) => state.cart)
  // const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : [])
  console.log(cartItems)
  return (
    <div className='cart-main-container'>
      <div className="cart-items-main-container">
        <h1>Shopping Cart</h1>
        <div className="cart-items-card-container">
          {cartItems?.map((item) => {
            return <CartItemCard item={item}/>
          })}
        </div>

        <button>Proceed to Order</button>
      </div>
      <div className="cart-price-main-container">
        <CartSummary/>
      </div>
    </div>
  )
}

export default CartPage