import { Badge } from "@material-ui/core";
import {
  Search,
  ShoppingCartOutlined,
  FavoriteIcon,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, Navigate, useNavigate } from "react-router-dom";
import user from "../utils/UserInfo";
import NavDropdown from "react-bootstrap/NavDropdown";

const Container = styled.div`
  height: 85px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
`;

const Option = styled.option`
  color: black;
  background: white;
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
`;

const Navbar = (prop) => {
  let navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Logo><img src={require("../logo/logo.jpg")} height={75}/></Logo>
          </Link>
          <Link to={"/aboutus"} style={{ textDecoration: "none", color: "black" }}>
          <MenuItem style={{width:"100px"}}>ABOUT US</MenuItem>
          </Link>
          <Link to={"/contact"} style={{ textDecoration: "none", color: "black" }}>
          <MenuItem>CONTACT</MenuItem>
          </Link>
        </Left>
        {user.IsAdmin() && (
          <Link
            to={"/categories"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>
              <h6>SHOW CATEGORIES</h6>
            </MenuItem>
          </Link>
        )}
        <Right>
          {!user.IsAdmin() && (
            <Link
              to={"/categories"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>SEE CATEGORIES</MenuItem>
            </Link>
          )}
          {!user.IsLoggedIn() && (
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>REGISTER</MenuItem>
            </Link>
          )}
          {!user.IsLoggedIn() && (
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          )}

          {!user.IsAdmin() && user.IsLoggedIn() && (
            <MenuItem>
              <Link
                to={"/wishlists"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Badge
                  badgeContent={prop.size}
                  color="primary"
                >
                  <FavoriteBorderOutlined />
                </Badge>
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </MenuItem>
          )}

          {!user.IsAdmin() && (
            <MenuItem>
              <Link
                to={"/carts"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Badge
                  badgeContent={sessionStorage.getItem("cartSize")}
                  color="primary"
                >
                  <ShoppingCartOutlined />
                </Badge>
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </MenuItem>
          )}

          {user.IsAdmin() ? (
            <NavDropdown title={user.getName()} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/myprofile">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="/updatepassword">
                Update Password
              </NavDropdown.Item>
              <NavDropdown.Item href="/categoryList">
                See Categories
              </NavDropdown.Item>
              <NavDropdown.Item href="/products">See Products</NavDropdown.Item>
              <NavDropdown.Item href="/users">See All Users</NavDropdown.Item>
              <NavDropdown.Item href="/orders">
                List All Orders
              </NavDropdown.Item>
              <NavDropdown.Item href="/sales">
                View Sales
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Sign out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            user.IsLoggedIn() &&
            !user.IsAdmin() && (
              <NavDropdown title={user.getName()} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/myprofile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/updatepassword">
                  Update Password
                </NavDropdown.Item>
                <NavDropdown.Item href="/address">My Address</NavDropdown.Item>
                <NavDropdown.Item href="/userorders">
                  My Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Sign out</NavDropdown.Item>
              </NavDropdown>
            )
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
