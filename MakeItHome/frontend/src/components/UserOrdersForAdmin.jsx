import React, { useEffect, useState } from "react";
import orderService from "../services/order.service";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import user from "../utils/UserInfo";

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
  padding: 5x;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
`;

const UserOrdersForAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    orderService
      .getUserOrders(id)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setFlag(true);
      })
      .catch(() => {
        console.log("Error while getting order list");
      });
  }, [flag]);

  const orderDetails = (id) => {
    navigate("/orderdetails/" + id);
  };

  const approveOrder = (id) => {
    orderService
      .approveOrder(id)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(() => {
        console.log("Error while approving order");
      });
  };

  const cancelOrder = (id) => {
    orderService
      .cancelOrder(id)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(() => {
        console.log("Error while cancelling order");
      });
  };

  return (
    <>
      <Navbar />
      <hr />
      {user.IsAdmin() && (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Btn className="btn4 btn btn-info" onClick={() => navigate(-1)}>
            BACK
          </Btn>
        </>
      )}{" "}
      <hr />
      <div className="container">
        {orders.length == 0 ? (
          <h5 className="nameColor1">
            <Heading>No Orders</Heading>
          </h5>
        ) : (
          <>
            <h2 className="text-center">User Orders History</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Orders Amount</th>
                  <th>Order Date {"&"} Time</th>
                  <th>Order Status</th>
                  <th>Shipping Address</th>
                  <th>Details</th>
                  <th>Approve Order</th>
                  <th>Cancel Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.razorPayOrderId}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderTime}</td>
                    <td className="nameColor1">{order.status}</td>
                    <td>{order.shippingAddress}</td>
                    <td>
                      <Button
                        className="btn4 btn-dark"
                        onClick={() => orderDetails(order.id)}
                      >
                        Details
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn4 btn-info"
                        onClick={() => approveOrder(order.id)}
                      >
                        Approve
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn4 btn-danger"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </Button>
                    </td>
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
export default UserOrdersForAdmin;
