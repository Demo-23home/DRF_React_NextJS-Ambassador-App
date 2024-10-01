import React, { useState } from "react";
import { Product } from "../../models/products";
import { useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/products");
      setProducts(data);
    })();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you Sure ?")) {
      axios.delete(`products/${id}/`);
      setProducts(products.filter((product) => product.id != id));
    }
  };

  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Button
          variant="contained"
          href={"products/create/"}
          onClick={() => ""}
        >
          Add
        </Button>
      </div>
      <Table className="table table-striped table-sm">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Adjust data based on current page and rowsPerPage
            .map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <img src={product.image} width={60} height={60} />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>{" "}
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              {/* Use Box to customize the alignment */}
              <Box display="flex" justifyContent="flex-start">
                <TablePagination
                  count={products.length}
                  page={page}
                  onPageChange={handlePageChange}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPageOptions={[5, 10, 25, 50]} // Add different page size options
                  component="div"
                />
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Layout>
  );
};

export default Products;
