import React from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
const NavLinks = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align-center"}
    >
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
};

export default NavLinks;
