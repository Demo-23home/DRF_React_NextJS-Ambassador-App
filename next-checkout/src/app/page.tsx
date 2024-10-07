import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Layout from "../components/Layout"; // Import your Layout component


const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="py-5 text-center bg-light"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHN0b3JlfGVufDB8fHx8fDE2NTgxNzY4MzU&ixlib=rb-1.2.1&q=80&w=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="display-4 text-white">Welcome to Our Store</h1>
          <p className="lead text-white">
            Discover the best products tailored just for you!
          </p>
          <a href="/products" className="btn btn-primary btn-lg px-4 me-2">
            Explore Products
          </a>
          <a href="/contact" className="btn btn-outline-secondary btn-lg px-4 text-white">
            Contact Us
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <div className="row">
          {/* Fast Shipping */}
          <div className="col-md-4">
            <div className="card text-center border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1574737273449-3538c56cce40?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fHRlY2h8ZW58MHx8fHwxNjI5MjE0NDI5&ixlib=rb-1.2.1&q=60&w=500"
                className="card-img-top"
                alt="Fast Shipping"
              />
              <div className="card-body">
                <h5 className="card-title">Fast Shipping</h5>
                <p className="card-text">
                  Get your products delivered quickly with our reliable and
                  speedy shipping options.
                </p>
              </div>
            </div>
          </div>
          {/* Quality Products */}
          <div className="col-md-4">
            <div className="card text-center border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHF1YWxpdHl8ZW58MHx8fHwxNjU4MDM0MTQ2&ixlib=rb-1.2.1&q=60&w=500"
                className="card-img-top"
                alt="Quality Products"
              />
              <div className="card-body">
                <h5 className="card-title">Quality Products</h5>
                <p className="card-text">
                  We ensure all our products meet high-quality standards, giving
                  you the best shopping experience.
                </p>
              </div>
            </div>
          </div>
          {/* 24/7 Support */}
          <div className="col-md-4">
            <div className="card text-center border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRlY2glMjBzdXBwb3J0fGVufDB8fHx8fDE2NTgwMzQxNTU&ixlib=rb-1.2.1&q=60&w=500"
                className="card-img-top"
                alt="24/7 Support"
              />
              <div className="card-body">
                <h5 className="card-title">24/7 Support</h5>
                <p className="card-text">
                  Our support team is here to help you anytime, day or night,
                  for any inquiries or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-dark text-white text-center py-5">
        <h2>Ready to Start Shopping?</h2>
        <p className="lead mb-4">
          Click below to browse our collection and place your order today!
        </p>
        <a href="http://localhost:4000/" className="btn btn-warning btn-lg">
        Start Shopping
        </a>
      </div>
    </Layout>
  );
};

export default HomePage;
