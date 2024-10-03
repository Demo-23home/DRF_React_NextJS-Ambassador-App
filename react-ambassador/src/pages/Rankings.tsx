import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Rankings = () => {
  const [rankings, setRankings] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("rankings");
        setRankings(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        navigate("/");
      }
    })();
  }, [navigate]);

  return (
    <Layout>
      <div className="table-responsive">
        <table className="table table-stripped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(rankings).map((key: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{key}|</td>
                  <td>{rankings[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Rankings;
