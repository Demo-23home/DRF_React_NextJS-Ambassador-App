import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-danger">Oops! Something went wrong.</h1>
      <p className="lead">An error occurred while processing your request.</p>
      <button
        className="btn btn-danger mt-4"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
