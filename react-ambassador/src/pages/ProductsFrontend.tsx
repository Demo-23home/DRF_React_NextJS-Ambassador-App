import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";
import { Product } from "../models/product";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import { Filters } from "../models/Filters";

const ProductsFrontend = () => {
  const [lastPage, setLastPage] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1
  });

  const perPage = 9;
  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get("/products/frontend");
        setAllProducts(data);
        setFilteredProducts(data);
        setLastPage(Math.ceil(data.length/perPage))
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

    setFilteredProducts(products.slice(0, perPage*filters.page));
    setLastPage(Math.ceil(products.length/perPage))
  }, [filters, allProducts]);


  return (
    <Layout>
      <Products
        products={filteredProducts}
        filters={filters}
        setFilters={setFilters}
        lastPage={lastPage}
      />
    </Layout>
  );
};

export default ProductsFrontend;
