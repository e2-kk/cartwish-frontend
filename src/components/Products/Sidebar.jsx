import React from "react";

import "./Sidebar.css";
import NavLinks from "../Navbar/NavLinks";
import useData from "../../hooks/useData";
import config from "../../config.json";

const Sidebar = () => {
  const { data: categories, errors } = useData("/category");
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {errors && <em className="form_error">{errors}</em>}
        {categories &&
          categories.map((category) => {
            return (
              <NavLinks
                key={category._id}
                id={category._id}
                title={category.name}
                link={`/products?category=${category.name}`}
                emoji={`${config.backendURL}/category/${category.image}`}
                sidebar={true}
              />
            );
          })}
      </div>
    </aside>
  );
};

export default Sidebar;
