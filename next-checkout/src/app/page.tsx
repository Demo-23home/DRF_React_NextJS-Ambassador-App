// src/app/page.tsx

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Layout from "../components/Layout"; // Import your Layout component

const HomePage = () => {
  return (
    <Layout>
      <div className="py-5 text-center">
        <h1>Welcome to the Checkout Page</h1>
        <p className="lead">Select a product to view details.</p>
      </div>
    </Layout>
  );
};

export default HomePage;
