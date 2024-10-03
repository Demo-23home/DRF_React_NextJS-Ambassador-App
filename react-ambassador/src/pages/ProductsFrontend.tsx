import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";
import { Product } from "../models/product";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsFrontend = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    s: ''
  })

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get("/products/frontend");
        setProducts(data);
      })();
    } catch (e) {
      navigate("/login");
    }
  }, []);

  return (
    <Layout>
      <Products products={products} filters={filters} setFilters={setFilters} />
    </Layout>
  );
};

export default ProductsFrontend;
