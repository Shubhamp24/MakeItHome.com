import React, { useEffect, useState } from "react";
import orderService from "../services/order.service";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";

const Heading = styled.h3`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Button = styled.button`
  width: 100px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Btn = styled.button`
  width: 20%;
  border: 1px solid grey;
  padding: 5px 10px;
  background-color: #018f91;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    orderService
      .getAllOrders()
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch(() => {
        console.log("Error while getting order list");
      });
  }, []);

  const orderDetails = (id) => {
    navigate("/orderdetails/" + id);
  };

  // const approveOrder = (id) => {
  //   orderService
  //     .approveOrder(id)
  //     .then((res) => {
  //       console.log(res.data);
  //       window.location.reload();
  //     })
  //     .catch(() => {
  //       console.log("Error while approving order");
  //     });
  // };

  // const cancelOrder = (id) => {
  //   orderService
  //     .cancelOrder(id)
  //     .then((res) => {
  //       console.log(res.data);
  //       window.location.reload();
  //     })
  //     .catch(() => {
  //       console.log("Error while cancelling order");
  //     });
  // };
  // };

  return (
    <>
      <Navbar />
      <hr />
      <Heading>Orders List</Heading>
      <Btn
        className="btn4 btn-dark"
        style={{ "background-color": "black" }}
        onClick={() => navigate("/orders")}
      >
        All Orders
      </Btn>
      <Btn className="btn4 btn-dark" onClick={() => navigate("/pendingorders")}>
        Pending Orders
      </Btn>
      <Btn className="btn4 btn-dark" onClick={() => navigate("/shippedorders")}>
        Shipped Orders
      </Btn>
      <Btn
        className="btn4 btn-dark"
        onClick={() => navigate("/cancelledorders")}
      >
        Cancelled Orders
      </Btn>
      <Btn
        className="btn4 btn-dark"
        onClick={() => navigate("/deliveredorders")}
      >
        Delivered Orders
      </Btn>
      <div className="container">
        {orders.length == 0 ? (
          <h5 className="nameColor1">
            <Heading>No Orders</Heading>
          </h5>
        ) : (
          <>
            <h2 className="text-center">All Orders</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Orders Amount</th>
                  <th>Order Date {"&"} Time</th>
                  <th>Order Status</th>
                  <th>User Email</th>
                  <th>Shipping Address</th>
                  <th>Details</th>
                  {/* <th>Approve Order</th>
                  <th>Cancel Order</th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.razorPayOrder}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderTime}</td>
                    <td className="nameColor1">{order.status}</td>
                    <td className="nameColor1">{order.userEmail}</td>
                    <td className="nameColor1">{order.shippingAddress}</td>
                    <td>
                      <Button
                        className="btn4 btn-dark"
                        onClick={() => orderDetails(order.id)}
                      >
                        Details
                      </Button>
                    </td>
                    {/* <td>
                      <button
                        className="btn4 btn-success"
                        onClick={() => approveOrder(order.id)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn4 btn-danger"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};
export default AllOrders;
