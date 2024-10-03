import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Product } from "../models/product";
import Products from "./Products";
import axios from "axios";

const ProductsBackend = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState({
    s: "",
  });

  useEffect(() => {
    (async () => {
      const searchParams: string[] = [];

      if (filters.s) {
        searchParams.push(`${filters.s}`);
      }

      const { data } = await axios.get(
        `/products/backend?search=${searchParams.join("&")}`
      );

      setProducts(data.data);
    })();
  }, [filters]);

  return (
    <Layout>
      <Products products={products} filters={filters} setFilters={setFilters} />
    </Layout>
  );
};

export default ProductsBackend;
