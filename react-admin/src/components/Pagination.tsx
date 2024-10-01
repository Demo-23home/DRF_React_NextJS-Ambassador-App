// Pagination.tsx
import React from "react";
import { TablePagination, Box } from "@mui/material";

interface PaginationProps {
  count: number; // Total number of items
  page: number; // Current page
  rowsPerPage: number; // Number of rows per page
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void; // Function to handle page change
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Function to handle rows per page change
  rowsPerPageOptions?: number[]; // Optional array for rows per page options
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50], // Default options
}) => {
  return (
    <Box display="flex" justifyContent="flex-start">
      <TablePagination
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
      />
    </Box>
  );
};

export default Pagination;
