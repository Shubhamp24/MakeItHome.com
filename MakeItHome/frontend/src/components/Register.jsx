import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import authenticationService from "../services/authentication.service";
import { useNavigate, useParams } from "react-router-dom";
import check from "../utils/UserInfo";
import Navbar from "./Navbar";
import userService from "../services/user.service";
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
  width: 31%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };

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
        .registerUser(formValues)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          swal("Successfully Registered!!!", "Click OK to continue", "success");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setIsLoading(false);
          swal(err.response.data.message, "Try With Different Email", "error");
        });
    }else{
      setIsLoading(false);
    }
    
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setIsLoading(true);
    
  };

  const validate = (values) => {
    const errors = {};
    const regexname = /^[A-Za-z]{2,}$/;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpass =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
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

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is Required!!!";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password do not match!!!";
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
      {isLoading ? <LoadingSpinner/> :
        <Container>
          <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form method="post" onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td align="left">
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        value={formValues.firstName}
                        onChange={handleChange}
                      />
                      <br />
                      <font align="left" color="red">
                        {formErrors.firstName}
                      </font>
                    </td>
                    <td align="right">
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="last name"
                        value={formValues.lastName}
                        onChange={handleChange}
                      />
                      <br />
                      <font align="left" color="red">
                        {formErrors.lastName}
                      </font>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} align="left">
                      <Input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                      <br />
                      <font align="left" color="red">
                        {formErrors.email}
                      </font>
                    </td>
                  </tr>
                  <tr>
                    <td align="left">
                      <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formValues.password}
                        onChange={handleChange}
                      />
                      <br />
                      <font align="left" color="red">
                        {formErrors.password}
                      </font>
                    </td>
                    <td align="right">
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                      />
                      <br />
                      <font align="left" color="red">
                        {formErrors.confirmPassword}
                      </font>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} align="left">
                      <Input
                        type="text"
                        name="phoneNumber"
                        placeholder="mobile no."
                        value={formValues.phoneNumber}
                        onChange={handleChange}
                      />
                      <br />
                      <font align="left" color="red">
                        {formErrors.phoneNumber}
                      </font>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </Agreement>
              <Button>CREATE</Button>
            </Form>
          </Wrapper>
        </Container>
      }
    </>
  );
};

export default Register;
