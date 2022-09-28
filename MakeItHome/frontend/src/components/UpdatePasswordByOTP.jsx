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

const UpdatePasswordByOTP = () => {

  const {code} = useParams();

  const initialValues = { 
    password: "", 
    confirmPassword: "" ,
    otp:""
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
      authenticationService.updatePassword(formValues)
      .then((res)=>{
        swal(res.data,"Please Login With New Password","success");
        sessionStorage.clear();
        navigate("/login");
      }).catch((err)=>{
        swal(err.response.data.message,"Try Again","error");
      })
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regexpass =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

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
          <Title>Enter New Password</Title>
          <Form method="post" onSubmit={handleSubmit}>
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
            <Input
              type="number"
              name="otp"
              placeholder="Enter OTP"
              value={formValues.otp}
              onChange={handleChange}
              required
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default UpdatePasswordByOTP;
