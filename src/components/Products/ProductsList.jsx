import React, { useState, useEffect } from "react";
import apiClient from "../../utils/api-client";
import "./ProductsList.css";

import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination.jsx";

const ProductsList = () => {
  //const [products, setProducts] = useState([]);
  //const [errors, setErrors] = useState("");

  //useEffect(() => {
  //apiClient
  //.get("/products")
  //.then((response) => setProducts(response.data.products))
  //.catch((error) => setErrors(error.message));
  //}, []);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const category = search.get("category");
  const serachQuery = search.get("search");

  const { data, errors, isLoadig } = useData(
    "/products",
    {
      params: {
        search: serachQuery,
        category: category,
        perPage: 10,
        page: page,
      },
    },
    [category, page, serachQuery]
  );
  useEffect(() => {
    setPage(1);
  }, [serachQuery, category]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePageChange = (page) => {
    //save previous query parameters
    const currentParams = Object.fromEntries([...search]);
    setSearch({
      ...currentParams,
      page: parseInt(currentParams.page || 1) + 1,
    });
    console.log(currentParams.page);
  };

  //Infinite Scrolling Implementation
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoadig &&
        data &&
        page < data.totalPages
      ) {
        console.log("Reached to Bottom");
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoadig]);

  //Logic for sorting products list
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH TO LOW</option>
          <option value="price asc">Price Low TO HIGH</option>
          <option value="rate desc">Rate HIGH TO LOW</option>
          <option value="rate asc">Rate Low TO HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {errors && <em className="form_error">{errors}</em>}
        {data?.products &&
          sortedProducts.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        {isLoadig &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>

      {/*data.totalProducts && (
        <Pagination
          totalPosts={data.totalProducts}
          postsPerPage={8}
          onClick={handlePageChange}
        />
      )*/}
    </section>
  );
};

export default ProductsList;
