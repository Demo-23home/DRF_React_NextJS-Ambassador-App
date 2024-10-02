import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsFrontend from "./pages/ProductsFrontend";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsFrontend  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
