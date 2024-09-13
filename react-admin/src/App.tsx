import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from './components/Nav';
import Menu from './components/Menu'

function App() {
  return (
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
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Header</th>
                      <th>Header</th>
                      <th>Header</th>
                      <th>Header</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1,001</td>
                      <td>Lorem</td>
                      <td>ipsum</td>
                      <td>dolor</td>
                      <td>sit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
