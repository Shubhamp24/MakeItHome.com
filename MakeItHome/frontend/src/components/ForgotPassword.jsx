import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import authenticationService from "../services/authentication.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import check from "../utils/UserInfo";
import Navbar from "./Navbar";
import swal from "sweetalert";
import LoadingSpinner from "./LoadingSpinner";

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

const ForgotPassword = () => {
    
  const initialValues = { email: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(sessionStorage.getItem("email1"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setIsLoading(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
       authenticationService
        .forgotPassword(formValues)
        .then((res) => {     
            console.data(res.data);     
            setIsLoading(false);
            swal("Password Reset Link has been sent to "+formValues.email,"Check you email","success")
        })
        .catch((err) => {
            console.log(err.response);
            setIsLoading(false);
            swal("Password Reset Link has been sent to "+formValues.email,"Check you email","success")
        //   swal(err);
          console.log("User is logged in : " + check.IsLoggedIn());
        });
    }else{
        setIsLoading(false);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!values.email) {
      errors.email = "Email is Required!!!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email Format!!!";
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      {isLoading?<LoadingSpinner/>:
      <Container>
        <Wrapper>
          <Title>Enter your Email</Title>
          <Form method="post" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <font align="left" color="red">
              {formErrors.email}
            </font>
            <Button type="submit">Submit</Button>
            <Link to="/login">Go To Login Page</Link>
            <Link to={"/register"}>New to MakeItHome ? Create an account</Link>
          </Form>
        </Wrapper>
      </Container>
      }
    </>
  );
};

export default ForgotPassword;

