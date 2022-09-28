import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import swal from "sweetalert";
import user from "../utils/UserInfo";

const Heading = styled.h3`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Button = styled.button`
  width: 120px;
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

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    userService
      .getAllCustomers()
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(() => {
        console.log("Error while getting order list");
      });
  }, [flag]);

  const viewOrders=()=>{}

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
        {users.length == 0 ? (
          <h5 className="nameColor1">
            <Heading>Currently No Users</Heading>
          </h5>
        ) : (
          <>
            <Heading>Registered Users</Heading>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>User Address</th>
                  <th>View User Orders</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="nameColor1">
                      <h6>{user.id}</h6>
                    </td>
                    <td className="nameColor1">
                      <h6>{user.firstName + " " + user.lastName}</h6>
                    </td>
                    <td className="nameColor1">
                      <h6>{user.email}</h6>
                    </td>
                    <td className="nameColor1">
                      <h6>{user.phoneNumber}</h6>
                    </td>
                    <td className="nameColor1" width={150} align="left">
                      <h6>
                        {user.address && <> {user.address.houseNo +
                          ", " +
                          user.address.street +
                          ", " +
                          user.address.city +
                          ", " +
                          user.address.state +
                          ", " +
                          user.address.country +
                          ". Zipcode: " +
                          user.address.zipCode}</>}
                      </h6>
                    </td>
                    <td>
                      <Button
                        className="btn4 btn-info"
                        onClick={() => navigate("/userorders/"+user.id)}
                      >
                        View Orders
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
export default UsersList;
