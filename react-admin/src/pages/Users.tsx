import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../models/user";
import { Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/ambassadors/");
      setUsers(data);
    })();
  }, []);

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
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default Users;
