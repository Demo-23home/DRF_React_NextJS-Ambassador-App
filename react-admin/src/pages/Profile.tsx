import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button, TextField, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

const Profile = () => {
  // State variables for user information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // State variables for password update
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State variables for handling loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/userinfo/");
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching user info:", err);
        setError("Failed to fetch user information.");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle profile data submission
  const handleDataSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      await axios.put("/profile/", data);
      setSuccess("Profile updated successfully.");
      setLoading(false);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
      setLoading(false);
    }
  };

  // Handle password submission
  const handlePasswordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Simple validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const passwordData = {
      password: password,
      confirm_password: confirmPassword, // Ensure this matches your backend
    };

    try {
      await axios.put("/password/", passwordData);
      setSuccess("Password updated successfully.");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    } catch (err: any) {
      console.error("Error updating password:", err);
      setError("Failed to update password.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3 className="mt-3">Account Information</h3>

      {error && (
        <Alert severity="error" className="mb-3">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="mb-3">
          {success}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <form className="mt-3" onSubmit={handleDataSubmit}>
          <div className="mb-3">
            <TextField
              label="Email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              label="First Name"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Last Name"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}

      <h3 className="mt-5">Password Update</h3>

      <form className="mt-3" onSubmit={handlePasswordSubmit}>
        <div className="mb-3">
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Confirm Password"
            variant="standard"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Layout>
  );
};

export default Profile;
