import React from 'react'
import './navbar.css'
import ecomLogo from '../../assets/images/ecomLogo.png'
import {BsCart4} from "react-icons/bs"
import {AiOutlineHeart} from "react-icons/ai"
import {RxPerson} from "react-icons/rx"
import {TfiSearch} from "react-icons/tfi"

const Navbar = () => {
  return (
    <div className='nav-container'>
      <img className='nav-logo' src={ecomLogo} alt='logo'/>
      <div className='nav-container-right'>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">My Orders</a>
          <a href="#">Contact Us</a>
        </div>
        
        <div className="nav-icons">
          <TfiSearch />
          <AiOutlineHeart/>
          <RxPerson/>
          <BsCart4/>
        </div>
      </div>
    </div>
  )
}

export default Navbar