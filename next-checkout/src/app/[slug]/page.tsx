"use client"; // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout"; // Adjust the import path as needed
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import axios from "axios";
import constants from "../../constants/constants";
import { Product } from "@/types/products";
import ProductOrder from "@/types/productOrder";

const DynamicPage = () => {
  const { slug } = useParams(); // Extract the slug parameter from the URL
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // State for quantities of each product

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${constants.baseUrl}/links/${slug}`);
      setUser(data.user);
      setProducts(data.products);
      
      // Initialize quantities for each product to 1
      const initialQuantities: { [key: number]: number } = {}
      data.products.forEach((product: Product) => {
        initialQuantities[product.id] = 1; // Set default quantity to 1
      });

      setQuantities(initialQuantities);
      setLoading(false); // Set loading to false after fetching data
    })();
  }, [slug]);

  if (!user) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="mt-3">Loading user information...</h5>
      </div>
    );
  }
  console.log(quantities)
  return (
    <Layout>
      <div className="py-5 text-center">
        <h2>Welcome</h2>
        <p className="lead">Has Invited You To Buy These Products</p>
      </div>

      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Products</span>
          </h4>
          <ul className="list-group mb-3">
            {products.map((product) => (
              <li
                className="list-group-item d-flex justify-content-between lh-condensed"
                key={product.id}
              >
                <div>
                  <h6 className="my-0">{product.title}</h6>
                  <small className="text-muted">{product.description}</small>
                  <div className="mt-2 d-flex align-items-center">
                    <label
                      htmlFor={`quantity-${product.id}`}
                      className="form-label mb-0 me-2 d-flex"
                    >
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      value={quantities[product.id] || 1} // Set default quantity
                      onChange={(e) => {
                        const value = Math.max(1, parseInt(e.target.value) || 1); // Ensure quantity is at least 1
                        setQuantities((prev) => ({ ...prev, [product.id]: value })); // Update quantity
                      }}
                      style={{ width: "65px" }}
                      className="text-muted form-control d-flex"
                    />
                  </div>
                </div>
                <span className="text-muted">${product.price}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>
                $
                {products
                  .reduce(
                    (total:number, product:Product) => total + Number(product.price) * (quantities[product.id] || 1),
                    0
                  )
                  .toFixed(2)}
              </strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Personal Info</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Country"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="City"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder="ZIP"
                />
              </div>
            </div>
            <hr className="mb-20" />
            <button className="btn btn-primary btn-lg w-100" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DynamicPage;
