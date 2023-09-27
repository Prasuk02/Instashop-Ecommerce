import React from 'react'
import ecomLogo from '../../assets/images/ecomLogo.png'
import { footerBrands } from '../../assets/content/footer'
import "./footer.css"

const Footer = () => {
  return (
    <>
        <div className="footer-container">
            <div className="footer-logo-section">
                <img src={ecomLogo} alt="logo" className="footer-logo" />
                <p>An Instashop is a fullstack project that involves building an online platform for buying and selling goods or services.</p>
            </div>
            <div className="footer-links">
                <h3>quick links</h3>
                <ul>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>My Orders</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="footer-links">
                <h3>Product Categories</h3>
                <ul>
                    <li>Men Wear</li>
                    <li>Women Wear</li>
                    <li>Kids Wear</li>
                    <li>Shoes</li>
                    <li>Bags</li>
                    <li>Electronic Items</li>
                </ul>
            </div>
            <div className="footer-links">
                <h3>top brands</h3>
                <div className="footer-brand-container">
                    {footerBrands.map((brand) => {
                        return <img src={brand} alt="brand-logo" className="footer-brand" />
                    })}
                </div>
            </div>
        </div>
        <div className='footer-copyright'>
            <p>copyright &copy; 2023 www.instashop.com.All rights reserved | Privacy Policy</p>
        </div>
    </>
  )
}

export default Footer