import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Users from "./pages/Users";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  Component={Users} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
