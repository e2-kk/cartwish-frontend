import React from "react";
import "./Products.css";
import Sidebar from "./Sidebar";
import ProductsList from "./ProductsList";

const Products = () => {
  return (
    <section className="products_page">
      <Sidebar />
      <ProductsList />
    </section>
  );
};

export default Products;
