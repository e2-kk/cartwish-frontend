import React, { useCallback, useEffect, useState, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";

import userContext from "./contexts/UserContext";
import cartContext from "./contexts/CartArrayContext";
import { removeFromCartAPI } from "./services/cartServices";

setAuthToken(getJwt());

function reduce(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id
      );

      const { product, quantity } = action.payload;

      if (productIndex === -1) {
        updatedCart.push({ product: product, quantity: quantity });
      } else {
        updatedCart[productIndex].quantity += quantity;
      }

      return updatedCart;

    case "GET_CART":
      return action.payload.products;

    case "REVERT_CART":
      action.payload.cart;

    case "REMOVE_FROM_CART":
      const oldCart = [...cart];
      const newCart = oldCart.filter(
        (item) => item.product._id !== action.payload.id
      );
      return newCart;
  }
}

const App = () => {
  const [user, setUser] = useState(null);
  //const [cart, setCart] = useState([]);
  const [cart, dispatch] = useReducer(reduce, []);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback(() => {
    //function of useReducer hook
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });

    //making call to CART API
    addToCartAPI(product._id, quantity)
      .then((response) => {
        toast.success("Product Added Succesfully");
      })
      .catch((err) => {
        toast.error("Failed to add product");
        dispatch({ type: "REVERT_CART", payload: { cart } });
      });
  }, [cart]);

  const removeFromCart = useCallback(
    (id) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
      removeFromCartAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        dispatch({ type: "REVERT_CART", payload: { cart } });
      });
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => {
      const oldCart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        dispatch({ type: "GET_CART", payload: { products: updatedCart } });

        increaseProductAPI(id).catch((err) => {
          toast.error("Something went wrong!");
          dispatch({ type: "REVERT_CART", payload: { cart } });
        });
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        dispatch({ type: "GET_CART", payload: { products: updateCart } });

        decreaseProductAPI(id).catch((err) => {
          toast.error("Something went wrong!");
          dispatch({ type: "REVERT_CART", payload: { cart } });
        });
      }
    },
    [cart]
  );

  const getCart = useCallback(() => {
    getCartAPI()
      .then((response) =>
        dispatch({ type: "GET_CART", payload: { products: response.data } })
      )
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider value={{ addToCart, removeFromCart, updateCart }}>
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </cartContext.Provider>
    </userContext.Provider>
  );
};

export default App;
