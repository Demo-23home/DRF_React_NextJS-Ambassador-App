import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "../models/user";

const Header = (props: { user: User }) => {
  const [title, setTitle] = useState("Welcome");
  const [description, setDescription] = useState("Share Links To Earn Money");

  let buttons;

  useEffect(() => {
    if (props.user?.id) {
      setTitle(`$${props.user.revenue}`);
      setDescription("You Have Earned So Far !");
    } else {
      setTitle("Welcome");
      setDescription("Share Links To Earn Money");
    }
  }, [props.user]);

  if (!props.user?.id) {
    buttons = (
      <p>
        <a href="/login" className="btn btn-primary my-2 mr-3">
          Login
        </a>
        <a href="register" className="btn btn-secondary my-2">
          Register
        </a>
      </p>
    );
  }

  return (
    <div>
      {" "}
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{title}</h1>
            <p className="lead text-body-secondary">{description}</p>
            {buttons}
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect((state: { user: User }) => ({
  user: state.user,
}))(Header);
