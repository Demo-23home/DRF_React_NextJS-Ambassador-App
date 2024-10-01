import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link as LinkModel } from "../models/Link"; // Renamed to avoid confusion with `react-router-dom`
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";

const Links = () => {
  const [links, setLinks] = useState<LinkModel[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Use `useParams` hook to get the route parameter
  const { id } = useParams<{ id: string }>();

  // Function to handle page change
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Function to handle the number of rows per page change
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page whenever rows per page changes
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const { data } = await axios.get(`links/${id}`);
        console.log(data)
        setLinks(data);
      }
    })();
  }, [id]);

  return (
    <Layout>
      <Table className="table table-striped table-sm">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Adjust data based on current page and rowsPerPage
            .map((link) => {
              return (
                <TableRow key={link.id}>
                  <TableCell>{link.id}</TableCell>
                  <TableCell>{link.code}</TableCell>
                  <TableCell>{link.orders.length}</TableCell>
                  {/* <TableCell>{link.orders}</TableCell> */}
                  <TableCell>
                    <Button variant="contained" color="primary">
                      View
                    </Button>
                  </TableCell>
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
                  count={links.length}
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

export default Links;
