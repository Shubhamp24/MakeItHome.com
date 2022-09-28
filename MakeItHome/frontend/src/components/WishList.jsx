import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import user from "../utils/UserInfo";
import wishlistService from "../services/wishlist.service";

const Heading = styled.h3`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

// const Image = styled.img`
// //   height: 1%;
//   width: 20%;
// //   z-index: 2;
// `;

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

const WishList = () => {
  const [wishlist, setWishList] = useState([]);
  const [count, setCount] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    wishlistService
      .getWishList()
      .then((res) => {
        console.log(res.data);
        setWishList(res.data);
      })
      .catch(() => {
        console.log("Error while getting wish list");
      });
  }, [count]);

  const removeFromWishList=(id)=>{
    wishlistService.removeFromWishList(id)
    .then((res)=>{
        swal({
            title: res.data,
            text: "",
            icon: "success",
            button: "OK",
          });    
          setCount(count+1);
    }).catch(()=>{
        console.log("Error occured while deleting product")
    })
  }

  const clearWishList=()=>{
    wishlistService.clearWishList()
    .then((res)=>{
      swal(res.data,"","success");
      setCount(count+1);
    }).catch((err)=>{
      swal(err.response.data.message,"","info");
    })
  }

  return (
    <>
      <Navbar size={wishlist.length}/>
      <hr />
      {!user.IsAdmin() && user.IsLoggedIn && (
              <>
                <Btn
                  className="btn4 btn btn-info"
                  onClick={clearWishList}
                >
                 Clear WishList
                </Btn>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Btn
                  className="btn4 btn btn-info"
                  onClick={() => navigate(-1)}
                >
                  BACK
                </Btn>
              </>
            )} <hr />
      <div className="container">
        {wishlist.length == 0 ? (
          <h5 className="nameColor1">
            <Heading>Wishlist is Empty!!!</Heading>
          </h5>
        ) : (
          <>
          <Heading>Products Added in WishList</Heading>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>View Details</th>
                  <th>Remove</th>
                  {/* <th>Approve Order</th>
                  <th>Cancel Order</th> */}
                </tr>
              </thead>
              <tbody>
                {wishlist.map((wishlist) => (
                  <tr key={wishlist.id}>
                    <td>
                      {
                        <img
                          src={require("../" +
                          wishlist.product.imagePath.replace("\\", "/"))}
                          width={120}
                        />
                      }
                    </td>
                    <td className="nameColor1">
                      <h6>{wishlist.product.productName}</h6>
                    </td>
                    <td>{wishlist.product.price}</td>
                    <td>
                      <Button className="btn4 btn-info"
                       onClick={()=>navigate("/products/"+wishlist.product.id)}
                      >View
                      </Button>
                    </td>
                    <td>
                      <Button className="btn4 btn-danger"
                      onClick={()=>removeFromWishList(wishlist.id)}
                      >Remove
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
export default WishList;
