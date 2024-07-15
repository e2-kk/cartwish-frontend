import React, { useState, useContext } from "react";
import "./SingleProduct.css";
import QuantityInput from "./QuantityInput.jsx";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import cartContext from "../../contexts/CartArrayContext";
import userContext from "../../contexts/UserContext";

const SingleProduct = () => {
  //get an id of the product
  const { addToCart } = useContext(cartContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  //load product data from api
  const { data: product, errors, isLoading } = useData(`/products/${id}`);
  console.log(product);
  const user = useContext(userContext);
  return (
    <section className="align_center single_product_page">
      {errors && <em className="form_error">{errors}</em>}
      {isLoading && <Loader />}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000/products/${image}`}
                  alt={product.title}
                  onClick={() => setSelectedImage(index)}
                  className={selectedImage === index ? "selected_image" : ""}
                />
              ))}
            </div>
            <img
              src={`http://localhost:3000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>

            {user && (
              <>
                <h2 className="quantity_title">Quantity:</h2>
                <div className="align_center quantity_input"></div>
                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  {" "}
                  Add to Cart
                </button>
                <QuantityInput
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={product.stock}
                />
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProduct;
