import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Product } from "../models/product";
import Products from "./Products";
import axios from "axios";
import { Filters } from "../models/Filters";
import { useStepContext } from "@mui/material";

const ProductsBackend = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1,
  });

  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const queryParams: string[] = [];

      // Search
      if (filters.s) {
        queryParams.push(`search=${filters.s}`);
        filters.page = 1;
      }

      // Sort
      if (filters.sort) {
        queryParams.push(`sort=${filters.sort}`);
        filters.page = 1;
      }

      // queryParams = ["search=qz", "search=qr", "sort=asc" ] => ?"search=qz"&&"search=qr"&&"sort=asc

      if (filters.page) {
        queryParams.push(`page=${filters.page}`);
      }

      const { data } = await axios.get(
        `/products/backend?${queryParams.join("&")}`
      );

      setProducts(filters.page === 1 ? data.data : [...products, ...data.data]);
      setLastPage(data.meta.last_page)
    })();
  }, [filters]);

  return (
    <Layout>
      <Products products={products} filters={filters} setFilters={setFilters} lastPage={lastPage}/>
    </Layout>
  );
};

export default ProductsBackend;
