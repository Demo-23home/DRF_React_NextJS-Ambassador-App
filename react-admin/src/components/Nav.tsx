// Nav.js
import React from "react";
import { User } from "../models/user";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const Nav = (props: { user: User | null }) => {
  const logout = async () => {
    await axios.post("/logout/");
  };
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        Company name
      </a>
      <ul className="my-2 my-md-0 mr-md-3">
        <Link className="p-2 text-white text-decoration-none" to="/profile">
          {" "}
          {props.user?.first_name} {props.user?.last_name}
        </Link>
        <Link
          className="p-2 text-white text-decoration-none"
          to="/login"
          onClick={logout}
        >
          {" "}
          Sign out{" "}
        </Link>
      </ul>
    </nav>
  );
};

export default connect((state: { user: User }) => ({
  user: state.user,
}))(Nav);
