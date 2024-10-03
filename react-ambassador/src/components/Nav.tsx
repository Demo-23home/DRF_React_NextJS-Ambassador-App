import React, { Dispatch, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { User } from "../models/user";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/actions /setUserActions";
import "../styles/Nav.css"; // Import your custom CSS for styling

const Nav = (props: { user: User; setUser: any }) => {
  let menu;

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/logout/");
    props.setUser(null);
  };

  if (props.user?.id) {
    menu = (
      <div className="col-md-3 d-flex text-end align-items-center">
        <Link to="/rankings/" style={{ color: "black" }} className="btn me-2">
          Ranking
        </Link>
        <Link to="/stats/" style={{ color: "black" }} className="btn me-2">
          Stats
        </Link>
        <Link
          to="/login/"
          className="btn btn-outline-primary me-2 mr-3"
          onClick={handleLogout}
        >
          Logout
        </Link>
        <Link to="/profile/" className="btn btn-primary">
          {props.user.first_name} {props.user.last_name}
        </Link>
      </div>
    );
  } else {
    menu = (
      <div className="col-md-3 text-end align-items-center">
        <Link to="/login" className="btn btn-outline-primary me-2 mr-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary">
          Sign-up
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 d-flex">
          <li className="mr-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link px-2 link-style ${isActive ? "link-dark" : "link-secondary"}`
              }
              style={{ color: "black" }}
            >
              Frontend
            </NavLink>
          </li>
          <li className="ml-3">
            <NavLink
              to="/backend"
              className={({ isActive }) =>
                `nav-link px-2 link-style ml-3 ${isActive ? "link-dark" : "link-secondary"}`
              }
              style={{ color: "black" }}
            >
              Backend
            </NavLink>
          </li>
        </ul>
        {menu}
      </header>
    </div>
  );
};

export default connect(
  (state: { user: User }) => ({
    user: state.user,
  }),
  (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
  })
)(Nav);
