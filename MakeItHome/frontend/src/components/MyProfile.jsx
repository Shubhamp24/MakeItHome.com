import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import authenticationService from "../services/authentication.service";
import { useNavigate, useParams } from "react-router-dom";
import check from "../utils/UserInfo";
import Navbar from "./Navbar";
import userService from "../services/user.service";
import swal from "sweetalert";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.wallpaperscraft.com/image/single/furniture_sofa_table_vase_style_interior_68103_1280x720.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const MyProfile = () => {

  const [count,setCount]=useState(0);
  const user=JSON.parse(sessionStorage.getItem("user"));
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };

  const initialAddress = {
    
  }

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      userService
        .updateprofile(formValues)
        .then((res) => {
          console.log(res.data);
          console.log(JSON.stringify(res.data))
          sessionStorage.setItem("user",JSON.stringify(res.data));
          swal({
            title: "Profile updated Successfully!!!",
            text: "",
            icon: "success",
            button: "",
          });
          setTimeout(()=>{window.location.reload()},1000)
        })
        .catch(() => {
          alert("Error While updating profile details");
        });
    }
  }, [formErrors, count]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
  };

  const validate = (values) => {
    const errors = {};
    const regexname = /^[A-Za-z]{2,}$/;
    const regexphone = /^[6-9]\d{9}$/;
    if (!values.firstName) {
      errors.firstName = "First Name is Required!!!";
    } else if (!regexname.test(values.firstName)) {
      errors.firstName = "Invalid First Name!!!";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is Required!!!";
    } else if (!regexname.test(values.lastName)) {
      errors.lastName = "Invalid Last Name!!!";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Mobile No. is Required!!!";
    } else if (!regexphone.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid Mobile No.!!!";
    }

    return errors;
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>My Profile</Title>
          <Form method="post" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="firstName"
              placeholder="first name"
              value={formValues.firstName}
              onChange={handleChange}
            />
            <font align="left" color="red">
              {formErrors.firstName}
            </font>
            <Input
              type="text"
              name="lastName"
              placeholder="last name"
              value={formValues.lastName}
              onChange={handleChange}
            />
            <font align="left" color="red">
              {formErrors.lastName}
            </font>
            <Input
              type="text"
              name="email"
              placeholder="email"
              value={formValues.email} disabled
            />
            <Input
              type="text"
              name="phoneNumber"
              placeholder="mobile no."
              value={formValues.phoneNumber}
              onChange={handleChange}
            />
            <font align="left" color="red">
              {formErrors.phoneNumber}
            </font>
            <br/>
            <Button className="btn4 btn-dark">Update Profile</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default MyProfile;
