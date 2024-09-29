import React from "react";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import Layout from "../components/Layout";

const Users = () => {
  return (
    <Layout>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1,001</td>
            <td>Lorem</td>
            <td>ipsum</td>
            <td>dolor</td>
            <td>sit</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default Users;
