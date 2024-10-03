import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [redirect, setRedirect] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: confirmPassword,
    };

    axios
      .post("register/", userData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        setRedirect(true);
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  if (redirect) {
    navigate("/login");
  }

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>

      <label className="sr-only">First Name</label>
      <input
        name="firstName"
        className="form-control mb-3"
        placeholder="First Name"
        required
        value={formData.firstName}
        onChange={handleChange}
      />

      <label className="sr-only">Last Name</label>
      <input
        name="lastName"
        className="form-control mb-3"
        placeholder="Last Name"
        required
        value={formData.lastName}
        onChange={handleChange}
      />

      <label className="sr-only">Email address</label>
      <input
        type="email"
        name="email"
        className="form-control mb-3"
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
        name="password"
        className="form-control mb-3"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
      />

      <label htmlFor="confirmPassword" className="sr-only">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        className="form-control mb-3"
        placeholder="Confirm Password"
        required
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
        Submit
      </button>
    </form>
  );
}
