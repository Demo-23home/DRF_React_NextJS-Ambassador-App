import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../models/user";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/ambassadors/");
      setUsers(data);
    })();
  }, []);

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

  return (
    <Layout>
      <Table className="table table-striped table-sm">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Adjust data based on current page and rowsPerPage
            .map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell> {/* Add action buttons if needed */}</TableCell>
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
                  count={users.length}
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

export default Users;
