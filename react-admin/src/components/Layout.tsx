import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/userinfo/");
        console.log(data);
      } catch (e) {
        setRedirect(true)
      }
    })();
  }, []);

  if (redirect) {
    navigate('/login/')
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

export default Layout;
