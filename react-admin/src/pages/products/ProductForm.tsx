import React, { useState, SyntheticEvent } from "react";
import Layout from "../../components/Layout";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      title: title,
      image: image,
      price: price,
      description: description,
    };

    try {
      axios
        .post("/products/", data)
        .then((res) => {
          console.log(res);
          navigate("/products/");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextField
            label="Title"
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Image"
            variant="standard"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Price"
            variant="standard"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Description"
            variant="standard"
            rows={4}
            multiline
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button variant="contained" color={"primary"} type="submit">
          submit
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
