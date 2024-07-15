import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate, Link } from "react-router-dom";

import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";

import NavLinks from "./NavLinks";
import userContext from "../../contexts/UserContext";
import cartContext from "../../contexts/CartArrayContext";
import { getSuggestionsAPI } from "../../services/productServices";

const Navbar = () => {
  const user = useContext(userContext);
  const { cart } = useContext(cartContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((response) => setSuggestions(response.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delaySuggestions);
  }, [search]);

  console.log(suggestions);

  const handleKeyDown = (event) => {
    if (selectedItem < suggestions.length) {
      if (event.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (event.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current - 1
        );
      } else if (event.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  console.log(selectedItem);
  return (
    <nav className="align_center navbar">
      <div className="align_center ">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            value={search}
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            onKeyDown={handleKeyDown}
          ></input>
          <button type="submit" className="search_button">
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <NavLinks title="Home" link="/" emoji={rocket} />
        <NavLinks title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <NavLinks title="LogIn" link="/login" emoji={idButton} />
            <NavLinks title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <NavLinks title="My Orders" link="/myorders" emoji={order} />
            <NavLinks title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
