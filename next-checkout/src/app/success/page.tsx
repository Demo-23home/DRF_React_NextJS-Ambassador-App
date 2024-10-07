"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import constants from "@/constants/constants";

const SuccessPage = () => {
  useEffect(() => {
    // Extract query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source'); // Extracting the 'source' parameter

    if (source) {
      console.log("Source:", source);
      (async () => {
        try {
          await axios.post(`${constants.baseUrl}/orders/confirm/`, {
            source: source, // Sending the extracted source
          });
        } catch (error) {
          console.error("Error confirming the order:", error);
        }
      })();
    }
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-success">Success!</h1>
      <p className="lead">Your action has been successfully completed.</p>
      <button
        className="btn btn-primary mt-4"
        // onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessPage;
