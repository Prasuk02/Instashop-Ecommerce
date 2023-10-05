import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/Product/ProductCard";
import { getProducts } from "../../actions/productActions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Loader from "../../components/layout/Loader";
import { TfiSearch } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Slider, Stack } from "@mui/material";
import { productCategoryList } from "../../assets/content/category";
import ReactStars from "react-rating-stars-component";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useParams();
  const { products, productCount, loading } = useSelector(
    (state) => state.products
  );

  const [searchInput, setSearchInput] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 300000]);

  const handlePriceSlider = (newPrice) => {
    setPriceRange(newPrice.target.value);
  };

  const handlePriceFilterDispatch = () => {
    dispatch(getProducts(keyword, selectedCategory, selectedRating, priceRange))
  }

  const handleSearchResult = () => {
    if (searchInput.trim()) {
      navigate(`/products/${searchInput}`);
    }
  };

  useEffect(() => {
    dispatch(getProducts(keyword, selectedCategory, selectedRating));
  }, [keyword, selectedCategory, selectedRating]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="products-page-main-container">
          {/* LEFT SIDE CONTAINER */}
          <div className="product-page-left-container">
            <div className="search-box-container">
              <input
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                className="search-box"
                type="text"
                placeholder="Search product"
              />
              <TfiSearch
                onClick={handleSearchResult}
                className="search-box-icon"
              />
            </div>

            {/* FILTER BY PRICE */}
            <Stack
              direction="row"
              className="price-range-heading"
              alignItems="center"
              justifyContent="space-between"
            >
              <p>Filter by price</p>
              <button
                className="filter-clear-btn"
                onClick={() => {
                  setPriceRange([0, 300000])
                  handlePriceFilterDispatch();
                }}
              >
                Clear
              </button>
            </Stack>
            <div className="price-range-slider">
              <Slider
                getAriaLabel={() => "range-slider"}
                value={priceRange}
                onChange={handlePriceSlider}
                valueLabelDisplay="auto"
                min={0}
                max={300000}
                color={"secondary"}
              />
            </div>
            <Stack
              mt="5px"
              direction="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <button onClick={handlePriceFilterDispatch} className="filter-price-btn">Filter</button>
              <p className="price-range-p">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
            </Stack>

            {/* CATEGORY */}
            <Stack
              direction="row"
              className="price-range-heading"
              alignItems="center"
              justifyContent="space-between"
            >
              <p>Filter by</p>
              <button
                className="filter-clear-btn"
                onClick={() => {
                  setSelectedCategory("");
                }}
              >
                Clear
              </button>
            </Stack>
            <div className="category-list-container">
              {productCategoryList.map((category) => {
                return (
                  <p
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                    className={
                      selectedCategory === category && "isFilterSelected"
                    }
                  >
                    {category}
                  </p>
                );
              })}
            </div>

            {/* FILTER BY RATING */}
            <Stack
              direction="row"
              className="price-range-heading"
              alignItems="center"
              justifyContent="space-between"
            >
              <p>Filter by rating</p>
              <button
                className="filter-clear-btn"
                onClick={() => {
                  setSelectedRating(0);
                }}
              >
                Clear
              </button>
            </Stack>
            <div className="filter-rating-container">
              {new Array(5).fill(0).map((rating, key) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedRating(5 - key);
                    }}
                    className={selectedRating === 5 - key && "isFilterSelected"}
                  >
                    <div>
                      <ReactStars
                        count={5}
                        value={5 - key}
                        size={22}
                        isHalf={true}
                        activeColor="#f79d00"
                        color="#bbb"
                        edit={false}
                      />
                    </div>
                    <span> {key != 0 && "or more"} </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE CONTAINER */}
          <div className="product-page-right-container">
            <p>Showing all {products.length} results</p>

            <div className="product-container">
              {products?.map((product) => {
                return <ProductCard product={product} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
