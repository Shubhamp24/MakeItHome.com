import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import productService from "../services/product.service";
import swal from "sweetalert";
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

const ProductListByCategory = () => {

  const {id} =useParams();
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    productService
      .getAllProductsByCategoryId(id)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(() => {
        console.log("Error while getting order list");
      });
  }, [flag]);

  const deleteProduct=(id)=>{
    productService.deleteProductById(id)
    .then((res)=>{
        swal({
            title: res.data,
            text: "",
            icon: "success",
            button: "OK",
          });
          setFlag(true);        
    }).catch(()=>{
        console.log("Error occured while deleting product")
    })
  }

  const editProduct=(id)=>{
    navigate("/editproduct/"+id)
  }

  return (
    <>
      <Navbar />
      <hr />
      {user.IsAdmin() && (
              <>
                <Btn
                  className="btn4 btn btn-info"
                  onClick={() => navigate("/addcategory")}
                >
                  ADD NEW CATEGORY
                </Btn>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Btn
                  className="btn4 btn btn-info"
                  onClick={() => navigate("/addproduct")}
                >
                  ADD NEW PRODUCT
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
        {products.length == 0 ? (
          <h5 className="nameColor1">
            <Heading>No Products</Heading>
          </h5>
        ) : (
          <>
          <Heading>Products List</Heading>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Available Stock</th>
                  <th>Category Type</th>
                  <th>Update</th>
                  <th>Remove</th>
                  {/* <th>Approve Order</th>
                  <th>Cancel Order</th> */}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {
                        <img
                          src={require("../" +
                            product.imagePath.replace("\\", "/"))}
                          width={120}
                        />
                      }
                    </td>
                    <td className="nameColor1">
                      <h6>{product.productName}</h6>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td className="nameColor1">
                      <h6>{product.categoryId.categoryName}</h6>
                    </td>

                    <td>
                      <Button className="btn4 btn-info"
                       onClick={()=>editProduct(product.id)}
                      >Edit
                      </Button>
                    </td>
                    <td>
                      <Button className="btn4 btn-danger"
                      onClick={()=>deleteProduct(product.id)}
                      >Delete
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
export default ProductListByCategory;
