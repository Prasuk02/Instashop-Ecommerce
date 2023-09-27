import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Facility from "../../components/Facility/Facility";
import Category from "../../components/Category/Category";
import "./home.css";
import ProductCard from "../../components/Product/ProductCard";
import p1 from "../../assets/images/p1.png";
import Metadata from "../../components/Metadata";
import { getProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.products)
  console.log("PRODUCTS: ", products)

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // const productsList = [
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description:
  //       "boAt Airdopes 121 Pro True Wireless Earbuds Signature Sound,Quad Mic Enx,Low Latency Mode for Gaming,50H",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  //   {
  //     _id: { $oid: "650efa9b60f0fd2bad0693a1" },
  //     name: "Rolex Titamium X32",
  //     description: "This is a sample product 11.",
  //     price: "24999",
  //     ratings: "2",
  //     images: [
  //       {
  //         public_id: "sample image",
  //         url: p1,
  //         _id: { $oid: "650efa9b60f0fd2bad0693a2" },
  //       },
  //     ],
  //     category: "watch",
  //     stock: "-8",
  //     numOfReviews: "0",
  //     user: { $oid: "650ebc2df3727297f76d3ce6" },
  //     createdAt: { $date: { $numberLong: "1695480411874" } },
  //     reviews: [],
  //     __v: { $numberInt: "1" },
  //   },
  // ];
  return (
    <>
      <Metadata title="Instashop - Homepage" />
      <Banner />
      <section className="homePage">
        <Facility />
        <Category />

        {/* FEATURED PRODUCTS  */}
        <section className="feature-product-section">
          <p>top sale on this week</p>
          <h3>Features Products</h3>
          <div className="home-product-list">
            {products.length ? products.map((product) => {
              return <ProductCard product={product} />;
            })
          : 
          <p>No products yet, might be some error from our side.<br/>
          Trying to fix it up. Please try again after sometime.</p>
          }
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
