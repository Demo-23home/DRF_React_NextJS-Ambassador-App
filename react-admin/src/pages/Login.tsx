import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/admin/login/",
        formData
      );

      if (response.status === 200) {
        // Login successful, redirect to the dashboard or another page
        setRedirect(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Redirect to /dashboard if redirect state is true
  if (redirect) {
    navigate("/");
    return null; // Prevent rendering of the form after redirect
  }

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="inputEmail"
        name="email"
        className="form-control"
        placeholder="Email address"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        name="password"
        className="form-control"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default Login;
