import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SuccessPage = () => {

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
