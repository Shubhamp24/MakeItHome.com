import "../css/sales.css";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";
import { useEffect } from "react";
import categoryService from "../services/category.service";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";

const Heading = styled.h3`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const SalesGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    categoryService
      .getCategoryWiseSales()
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  return (
    <>
      <Navbar />
      <hr />
      <br />
      <Heading style={{ marginLeft: "0%" }}>Category Wise Sales</Heading>
      <div
        style={{
          width: "60%",
          marginLeft: "21%",
          marginTop: "5%",
          height: "70%",
        }}
      >
        <br />
        <ResponsiveContainer width="90%" aspect={2}>
          <BarChart width={100} height={50} data={data}>
            <Bar dataKey="quantity" fill="#8884d8" />
            <XAxis dataKey="categoryName" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SalesGraph;
