import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import orderDetailsService from "../services/orderDetails.service";


const Heading = styled.h3`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Button = styled.button`
  width: 10%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  let navigate =useNavigate();
  const {id} =useParams();

  useEffect(() => {
    orderDetailsService
      .getOrderDetailsByOrderId(id)
      .then((res) => {
        console.log(res.data);
        setOrderDetails(res.data);
      })
      .catch(() => {
        console.log("Error while getting order details");
      });
  }, []);


  return (
    <>
      <Navbar />
      <hr />
      <Heading>Orders Details</Heading>
      <div className="container">
            <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Order Date</th>
                  <th>Product Price</th>
                  <th>Product Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((orderDetail) => (
                  <tr key={orderDetail.id}>
                    <td><img src={require("../"+orderDetail.product.imagePath.replace("\\","/"))} width={120}/></td>
                    <td>{orderDetail.product.id}</td>
                    <td>{orderDetail.product.productName}</td>
                    <td>{orderDetail.createdDate}</td>
                    <td>{orderDetail.price}</td>
                    <td>{orderDetail.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="btn4 btn-dark" onClick={()=>{navigate(-1)}}>Back</Button>
            </>
      </div>
    </>
  );
};

export default OrderDetails;
