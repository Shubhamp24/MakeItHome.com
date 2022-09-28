import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { mobile } from "../responsive";
import categoryService from "../services/category.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 10px 0px;
  padding: 5px;
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

const Container = styled.div`
  width: 100vw;
  height: 40vh;
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

const AddCategory = () => {
  const [imageFile, setImageFile] = useState("");
  const [category, setCategory] = useState({
    categoryName: "",
  });

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
    console.log(imageFile);
    let formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append(
      "category",
      new Blob([JSON.stringify({ ...category })], { type: "application/json" })
    );
    categoryService
      .addcategory(formData)
      .then((res) => {
        console.log(res.data);
        swal({
          title: res.data,
          text: "",
          icon: "success",
          button: "OK",
        });
          navigate(-1)
      })
      .catch((err) => {
        swal({
          title: err.response.data.message,
          text: "",
          icon: "error",
          button: "Add New Type",
        });
      });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  return (
    <div>
      <Navbar />
      <hr />
      <Title>Enter Category Details</Title>
      <Container>
        <Form onSubmit={handleSubmit}>
          <table style={{ border: "2px solid black" }}>
            <tbody>
              <tr>
                <th>&nbsp;&nbsp;&nbsp;Enter Category Title :</th>
                <td>
                  <Input
                    type="text"
                    name="categoryName"
                    value={category.categoryName}
                    onChange={handleInputChange}
                    minLength={3}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Category Image :</th>
                <td>
                  <Input
                    type="file"
                    name="imageFile"
                    id=""
                    onChange={handleFileChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button className="btn4 btn btn-dark" type="submit">ADD</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Container>
    </div>
  );
};

export default AddCategory;
