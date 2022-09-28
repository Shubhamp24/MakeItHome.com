import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import categoryService from "../services/category.service";
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

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch(() => {
        console.log("Error while getting order list");
      });
  }, [flag]);

  const deleteCategory = (id) => {
      categoryService
        .deleteCategoryById(id)
        .then((res) => {
          swal({
            title: res.data,
            text: "",
            icon: "success",
            button: "OK",
          });
          setFlag(true);
        })
        .catch(() => {
          console.log("Error occured while deleting category");
        });
  };

  const editCategory = (id) => {
    navigate("/editcategory/" + id);
  };

  const viewProducts = (id) => {
    navigate("/productslist/category/" + id);
  };

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
        {categories.length == 0 ? (
          <h5 className="nameColor1">
            <Heading>No Categories</Heading>
          </h5>
        ) : (
          <>
            <Heading>Category List</Heading>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Category Image</th>
                  <th>Category Name</th>
                  <th>Update</th>
                  <th>Remove</th>
                  <th>View Products</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      {
                        <img
                          src={require("../" +
                            category.imagePath.replace("\\", "/"))}
                          width={120}
                        />
                      }
                    </td>
                    <td className="nameColor1">
                      <h6>{category.categoryName}</h6>
                    </td>
                    <td>
                      <Button
                        className="btn4 btn-info"
                        onClick={() => editCategory(category.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn4 btn-danger"
                        onClick={() => deleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn4 btn-dark"
                        style={{ width: "140px" }}
                        onClick={() => viewProducts(category.id)}
                      >
                        View Products
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
export default CategoryList;
