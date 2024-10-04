import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";
import { Product } from "../models/product";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import { Filters } from "../models/Filters";

const ProductsFrontend = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1
  });

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get("/products/frontend");
        setAllProducts(data);
        setFilteredProducts(data);
      })();
    } catch (e) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const products = allProducts.filter(
      (p) =>
        p.title.toLowerCase().indexOf(filters.s.toLocaleLowerCase()) >= 0 ||
        p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
    );

    if (filters.sort) {
      products.sort((a, b) =>
        filters.sort === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    setFilteredProducts(products);
  }, [filters, allProducts]);

  return (
    <Layout>
      <Products
        products={filteredProducts}
        filters={filters}
        setFilters={setFilters}
      />
    </Layout>
  );
};

export default ProductsFrontend;
