import React, { useState, SyntheticEvent, useEffect } from "react";
import Layout from "../../components/Layout";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const {
            data: { title, image, price, description },
          } = await axios.get(`products/${id}`);
          setTitle(title);
          setImage(image);
          setPrice(price);
          setDescription(description);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      title: title,
      image: image,
      price: price,
      description: description,
    };

    if (id) {
      try {
        await axios.put(`/products/${id}/`, data);
      } catch (e) {
        console.log(e);
      }
    }

    try {
      await axios
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Image"
            variant="standard"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Price"
            variant="standard"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Description"
            variant="standard"
            value={description}
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
