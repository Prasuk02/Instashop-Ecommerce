import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/HomePage/Home";
import ProductDetails from "./Pages/ProductDetailsPage/ProductDetails";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import LoginSignupPage from "./Pages/LoginSignupPage/LoginSignupPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import { useDispatch } from "react-redux";
import { getCurrentUserDetails } from "./actions/userAction";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UpdateProfilePage from "./Pages/UpdateProfilePage/UpdateProfilePage";
import UpdatePasswordPage from "./Pages/UpdatePasswordPage/UpdatePasswordPage";
import CartPage from "./Pages/CartPage/CartPage";
import ShippingPage from "./Pages/ShippingPage/ShippingPage";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage/OrderConfirmationPage";
import { getStripeApiKey } from "./actions/stripeApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentGatewayPage from "./Pages/PaymentGatewayPage/PaymentGatewayPage";
import SuccessPage from "./Pages/SuccessPage/SuccessPage";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  const promise = loadStripe(
    "pk_test_51NxmnCSJ9gNFiMMFO0FQk6puXD6B0hsvgWc5Utas18CtHQyA8xjJyb2eHlLkXtivDjeXFuP99NfJiNB016HqV4Fd00LfTbj8BY"
  );
  useEffect(() => {
    dispatch(getCurrentUserDetails());

    async function fetchStripeApiKey() {
      const apiKey = await getStripeApiKey();
      setStripeApiKey(apiKey);
    }

    fetchStripeApiKey();
  }, []);

  console.log(stripeApiKey);

  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/login" element={<LoginSignupPage />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:keyword" element={<ProductsPage />} />
          <Route
            exact
            path="/account"
            element={<ProtectedRoute component={ProfilePage} />}
          />
          <Route
            exact
            path="/me/update"
            element={<ProtectedRoute component={UpdateProfilePage} />}
          />
          <Route
            exact
            path="/me/update/password"
            element={<ProtectedRoute component={UpdatePasswordPage} />}
          />
          <Route exact path="/cart" element={<CartPage />} />
          <Route
            exact
            path="/shipping"
            element={<ProtectedRoute component={ShippingPage} />}
          />
          <Route
            exact
            path="/order/confirm"
            element={<ProtectedRoute component={OrderConfirmationPage} />}
          />

          {stripeApiKey && (
            <Route
              exact
              path="/process/payment"
              element={
                <Elements stripe={promise}>
                  <ProtectedRoute component={PaymentGatewayPage} />
                </Elements>
              }
            />
          )}

          <Route
            exact
            path="/success"
            element={<ProtectedRoute component={SuccessPage} />}
          />

          <Route
            exact
            path="/myOrders"
            element={<ProtectedRoute component={MyOrders} />}
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
