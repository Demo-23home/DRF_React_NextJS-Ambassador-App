import React from "react";
import { Product } from "../models/product";
import { Filters } from "../models/Filters";

const Products = (props: {
  products: Product[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) => {
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

  return (
    <>
      <div className="col-md-12 mb-4 input-group">
        <input
          type="text"
          className="form-control"
          placeholder="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
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
          <div className="col" key={product.id}>
            <div
              className="card shadow-sm h-100 d-flex flex-column"
              style={{ height: "400px",  width: "400px"}} // Standard height for all cards
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
      <div className="d-flex mt-4 justify-content-center">
        <button className="btn btn-primary" onClick={handleLoad}>
          Load More
        </button>
      </div>
    </>
  );
};

export default Products;
