import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import authenticationService from "../services/authentication.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import check from "../utils/UserInfo";
import Navbar from "./Navbar";
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
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const ResetPassword = () => {

  const {code} = useParams();

  const initialValues = { 
    password: "", 
    confirmPassword: "" 
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      authenticationService.resetPassword(formValues,code)
      .then((res)=>{
        swal(res.data,"Please Login To Continue","success");
        navigate("/login");
      })
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpass =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    // if (!values.email) {
    //   errors.email = "Email is Required!!!";
    // } else if (!regex.test(values.email)) {
    //   errors.email = "Invalid Email Format!!!";
    // }

    if (!values.password) {
      errors.password = "Password is Required!!!";
    } else if (!regexpass.test(values.password)) {
      errors.password =
        "Password should have Minimum six characters, at least one letter, one number and one special character!!!";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is Required!!!";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password do not match!!!";
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Reset Password</Title>
          <Form method="post" onSubmit={handleSubmit}>
            {/* <Input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={formValues.email}
              onChange={handleChange}
              disabled
            />
            <font align="left" color="red">
              {formErrors.email}
            </font> */}
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <font align="left" color="red">
              {formErrors.password}
            </font>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            <font align="left" color="red">
              {formErrors.confirmPassword}
            </font>
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default ResetPassword;
