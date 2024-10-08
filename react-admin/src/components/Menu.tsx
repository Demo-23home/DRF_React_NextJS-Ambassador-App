// Menu.js
import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to={"/users"}
              className="nav-link active"
              aria-current="page"
            >
              Users
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink
              to={"/products"}
              className="nav-link active"
              aria-current="page"
            >
              Products
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink
              to={"/orders"}
              className="nav-link active"
              aria-current="page"
            >
              Orders
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink
              to={"/profile"}
              className="nav-link active"
              aria-current="page"
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
