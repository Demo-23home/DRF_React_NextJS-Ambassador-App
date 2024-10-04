import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Product } from "../models/product";
import Products from "./Products";
import axios from "axios";
import { Filters } from "../models/Filters";

const ProductsBackend = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort:"",
  });

  useEffect(() => {
    (async () => {
      const queryParams: string[] = [];
      
      // Search
      if (filters.s) {
        queryParams.push(`search=${filters.s}`);
      }

      // Sort
      if (filters.sort){
        queryParams.push(`sort=${filters.sort}`)
      }

      // queryParams = ["search=qz", "search=qr", "sort=asc" ] => ?"search=qz"&&"search=qr"&&"sort=asc

      const { data } = await axios.get(
        `/products/backend?${queryParams.join("&")}`
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
