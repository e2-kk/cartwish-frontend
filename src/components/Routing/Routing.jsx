import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../Home/HomePage.jsx";
import Products from "../Products/Products";
import SingleProduct from "../SingleProduct/SingleProduct";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../Myorder/MyOrderPage.jsx";
import LoginPage from "../Authentication/LoginPage.jsx";
import SignupPage from "../Authentication/SignupPage.jsx";
import Logout from "../Authentication/Logout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
