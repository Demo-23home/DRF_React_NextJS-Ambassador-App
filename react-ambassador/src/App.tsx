import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsFrontend from "./pages/ProductsFrontend";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsFrontend />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
