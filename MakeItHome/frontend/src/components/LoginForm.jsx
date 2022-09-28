import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import authenticationService from "../services/authentication.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import check from "../utils/UserInfo";
import Navbar from "./Navbar";
import swal from "sweetalert";
import ReCAPTCHA from "react-google-recaptcha";

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

const LoginForm = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
    sessionStorage.removeItem("email1");
    if (isVerified) {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        authenticationService
          .login(formValues)
          .then((res) => {
            console.log(res.data);
            sessionStorage.setItem("token", "Bearer " + res.data.jwt);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            sessionStorage.setItem(
              "role",
              JSON.parse(sessionStorage.getItem("user")).role
            );
            if (res.data.user.address) {
              sessionStorage.setItem(
                "address",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("user")).address
                )
              );
            }
            console.log(sessionStorage.getItem("token"));
            console.log(sessionStorage.getItem("user"));
            console.log("User is logged in : " + check.IsLoggedIn());
            console.log("User is ADMIN : " + check.IsAdmin());
            if (check.IsAdmin()) {
              navigate("/orders");
              window.location.reload();
            } else if (!localStorage.getItem("tempId")) {
              navigate("/carts");
              setTimeout(() => {
                navigate("/");
                window.location.reload();
              }, 50);
            } else if (check.IsLoggedIn()) {
              setTimeout(() => {
                navigate("/products/" + +localStorage.getItem("tempId"));
                window.location.reload();
                localStorage.clear();
              }, 200);
            }
          })
          .catch(() => {
            swal("Invalid Credentials", "CLick OK to try again", "error");
            console.log("User is logged in : " + check.IsLoggedIn());
          });
      }
    } else if (Object.keys(formErrors).length !== 0) {
    } else if (isSubmit) {
      swal("Prove you are human", "", "info");
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpass =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!values.email) {
      errors.email = "Email is Required!!!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email Format!!!";
    }

    if (!values.password) {
      errors.password = "Password is Required!!!";
    } else if (!regexpass.test(values.password)) {
      errors.password =
        "Password should have Minimum six characters, at least one letter, one number and one special character!!!";
    }
    return errors;
  };

  const handleChangeRecaptcha = (value) => {
    console.log("Captcha value:", value);
    setIsVerified(true);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
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
            <br />
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleChangeRecaptcha}
            />{" "}
            <br />
            <Button type="submit" className="btn4 btn-dark">
              LOGIN
            </Button>
            <Link to="/forgotpassword">Forgot Password?</Link>
            <Link to={"/register"}>New to MakeItHome ? Create an account</Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default LoginForm;
