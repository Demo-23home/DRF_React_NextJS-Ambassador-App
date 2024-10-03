import React, { Dispatch, useEffect, useState } from "react";
import Nav from "./Nav";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../models/user";
import { setUser } from "../redux/actions /setUserActions";
import { connect } from "react-redux";

const Layout = (props: any) => {
  return (
    <div>
      {" "}
      <Nav />
      <main>
        <Header />

        <div className="album py-5 bg-body-tertiary">
          <div className="container">{props.children}</div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
