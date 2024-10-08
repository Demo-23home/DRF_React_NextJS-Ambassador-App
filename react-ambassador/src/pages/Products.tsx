import React, { useState } from "react";
import { Product } from "../models/product";
import { Filters } from "../models/Filters";
import axios from "axios";

const Products = (props: {
  products: Product[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  lastPage: number;
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [notify, setNotify] = useState({
    error: false,
    show: false,
    message: "",
  });

  const handleSearch = (s: string) => {
    props.setFilters({
      ...props.filters,
      s: s,
    });
  };

  const handleSort = (sort: string) => {
    props.setFilters({
      ...props.filters,
      sort: sort,
    });
  };

  const handleLoad = () => {
    props.setFilters({
      ...props.filters,
      page: props.filters.page + 1,
    });
  };

  const handleSelect = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleGenerate = async () => {
    try {
      const { data } = await axios.post("links/", {
        products: selected,
      });
      setNotify({
        show: true,
        error: false,
        message: `Your Link Has Been Generated!: localhost:5000/${data.code}`,
      });
    } catch {
      setNotify({
        show: true,
        error: true,
        message: "You Must Be Logged In To Generate Links!",
      });
    }
    finally{
      setTimeout(() => {
        setNotify({
          error: false,
          show: false, 
          message: ''
        })
      }, 3000)
    }
  };

  // Define buttons conditionally based on state
  let loadButton, generateButton, info;

  if (props.filters.page !== props.lastPage) {
    loadButton = (
      <div className="d-flex mt-4 justify-content-center">
        <button className="btn btn-primary" onClick={handleLoad}>
          Load More
        </button>
      </div>
    );
  }

  if (selected.length > 0) {
    generateButton = (
      <div className="input-group-append">
        <button className="btn btn-info" onClick={handleGenerate}>
          Generate Link
        </button>
      </div>
    );
  }

  if (notify.show) {
    info = (
      <div className="col-md-12 mb-4">
        <div
          role="alert"
          className={notify.error ? "alert alert-danger" : "alert alert-info"}
        >
          {notify.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Display Notification */}
      {info}

      {/* Search, Sort, and Generate Button */}
      <div className="col-md-12 mb-4 input-group">
        <input
          type="text"
          className="form-control"
          placeholder="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {generateButton}
        <select
          className="form-select ml-2"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {props.products.map((product: Product) => (
          <div
            className="col"
            key={product.id}
            onClick={() => handleSelect(product.id)}
          >
            <div
              className={`card shadow-sm h-100 d-flex flex-column ${
                selected.some((s) => s === product.id) ? "selected" : ""
              }`}
              style={{ height: "400px", width: "400px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ objectFit: "cover", height: "200px", width: "100%" }} // Standardize image dimensions
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <p
                  className="card-text text-center"
                  style={{ fontWeight: "bold" }}
                >
                  {product.title}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-body-secondary">{product.price}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {loadButton}
    </>
  );
};

export default Products;
