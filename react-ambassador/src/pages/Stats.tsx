import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { StatsModel } from "../models/Stats";
import { useNavigate } from "react-router-dom";
const Stats = () => {
  const [stats, setStats] = useState<StatsModel[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("stats");
        setStats(data);
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
            {stats.map(
              (s: { code: string; revenue: number }, index: number) => {
                return (
                  <tr key={index}>
                    <td>{`http://localhost:5000/${s.code}`}</td>
                    <td>{s.code}|</td>
                    <td>{s.revenue}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Stats;
