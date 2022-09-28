import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { mobile } from "../responsive";
import productService from "../services/product.service";
import categoryService from "../services/category.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 10px 0;
  padding: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: black;
  padding-left: 5px;
  font-size: 16px;
  border: 1px solid black;
  margin-left: 0px;
`;

const Option = styled.option`
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const EditProduct = () => {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState("");
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  useEffect(() => {
    productService
      .getProductById(id)
      .then((res) => {
        console.log();
        setProduct(res.data);
      })
      .catch(() => {
        console.log("err while getting product");
      });
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    categoryService
      .getAllCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    console.log(imageFile);
    if(imageFile){
      let formData = new FormData();
      formData.append("imageFile", imageFile);
      formData.append(
        "product",
        new Blob([JSON.stringify({ ...product })], { type: "application/json" })
      );
      productService
        .updateProduct(formData)
        .then((res) => {
          console.log(res.data);
          swal({
            title: res.data,
            text: "",
            icon: "success",
            button: "OK",
          });
          navigate("/products/category/" + product.categoryId);
        })
        .catch((err) => {
          swal({
            title: err.response.data.message,
            text: "",
            icon: "error",
            button: "Please Retry",
          });
        });
      }else{
        productService.updateProductWithoutImage(product,product.id)
        .then((res)=>{
          console.log(res.data);
          swal({
            title: res.data,
            text: "",
            icon: "success",
            button: "OK",
          });
          navigate("/products/category/" + product.categoryId);
        }).catch(()=>{
          console.log("err while updating product")
        })
      }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const optionValues = () => {
    if (categories.length != 0) {
      return categories.map((category, id) => (
        <Option value={category.id} key={id}>
          {category.categoryName}
        </Option>
      ));
    }
  };

  return (
    <div>
      <Navbar />
      <hr />
      <Title>Update Product Details</Title>
      <Container>
        <Form onSubmit={handleSubmit}>
          <table style={{ border: "2px solid black" }}>
            <tbody>
              <tr>
                <th>Enter Product Name :</th>
                <td>
                  <Input
                    type="text"
                    name="productName"
                    value={product.productName}
                    onChange={handleInputChange}
                    minLength={3}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>&nbsp;&nbsp;&nbsp;Enter Product Description :</th>
                <td>
                  <Textarea
                    name="productDescription"
                    value={product.productDescription}
                    onChange={handleInputChange}
                    maxLength={255}
                    required
                    rows={4}
                  />
                </td>
              </tr>
              <tr>
                <th>Enter Product Price :</th>
                <td>
                  <Input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    min={1}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Available Stock :</th>
                <td>
                  <Input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    min={1}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Product Image :</th>
                <td>
                  <Input
                    type="file"
                    name="imageFile"
                    id=""
                    onChange={handleFileChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Select Category :</th>
                <td>
                  <Select
                    name="categoryId"
                    onChange={handleInputChange}
                    disabled
                  >
                    <Option disabled selected>
                      Select
                    </Option>
                    {optionValues()}
                  </Select>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <hr />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button className="btn4 btn btn-dark" type="submit">
                    UPDATE
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Container>
    </div>
  );
};

export default EditProduct;
