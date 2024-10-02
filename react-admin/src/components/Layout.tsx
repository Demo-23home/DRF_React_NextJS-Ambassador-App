import React, { Dispatch, useEffect, useState } from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";
import { setUser } from "../redux/actions /setUserActions";

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/userinfo/");
        // setUser(data);
        props.setUser(data);
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    navigate("/login/");
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <Nav />
          <div className="container-fluid">
            <div className="row">
              <Menu />
              <main
                role="main"
                className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
              >
                <div className="table-responsive">{props.children}</div>
              </main>
            </div>
          </div>
        </header>
      </div>
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
