import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Order } from "../models/order";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("orders");
      setOrders(data);
    })();
  }, []);

  // Calculate the visible orders based on pagination state
  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
    setPage(0); // Reset page on rows per page change
  };

  return (
    <Layout>
      {/* Display only the paginated orders */}
      {paginatedOrders.map((order) => (
        <Accordion key={order.id}>
          <AccordionSummary>
            {order.name} - ${order.total}
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Product Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.order_items.map((order_item) => (
                  <TableRow key={order_item.id}>
                    <TableCell>{order_item.id}</TableCell>
                    <TableCell>{order_item.product_title}</TableCell>
                    <TableCell>{order_item.price}</TableCell>
                    <TableCell>{order_item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* Place TablePagination outside of the Accordion for global control */}
      <Box display="flex"  mt={2}>
        <TablePagination
          count={orders.length} // Total orders count for pagination
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]} // Customize rows per page options
          component="div"
        />
      </Box>
    </Layout>
  );
};

export default Orders;
