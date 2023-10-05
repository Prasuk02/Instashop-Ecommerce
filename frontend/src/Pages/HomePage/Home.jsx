import React, { Fragment, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Facility from "../../components/Facility/Facility";
import Category from "../../components/Category/Category";
import "./home.css";
import ProductCard from "../../components/Product/ProductCard";
import Metadata from "../../components/Metadata";
import { getProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Metadata title="Instashop - Homepage" />
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <Banner />
          <section className="homePage">
            <Facility />
            <Category />

            {/* FEATURED PRODUCTS  */}
            <section className="feature-product-section">
              <p>top sale on this week</p>
              <h3>Features Products</h3>
              <div className="home-product-list">
                {products.length ? (
                  products.map((product) => {
                    return <ProductCard product={product} />;
                  })
                ) : (
                  <p>
                    {error}
                  </p>
                )}
              </div>
            </section>
          </section>
        </Fragment>
      )}
    </>
  );
};

export default Home;
