import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import userService from "../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import user from "../utils/UserInfo";
import Navbar from "./Navbar";
import swal from "sweetalert";
import State from "./State";

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

const Select = styled.select`
  width: 100%;
  height: 50px;
  background: white;
  color: black;
  padding-left: 5px;
  font-size: 16px;
  border: 1px solid black;
  margin-left: 0px;
`;

const Wrapper = styled.div`
  width: 45%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 10px 0;
  padding: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
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
const Address = () => {
  const address = user.getAddress();
  const initialValues = {
    houseNo: address ? address.houseNo : "",
    street: address ? address.street : "",
    city: address ? address.city : "",
    state: address ? address.state : "",
    country: "India",
    zipCode: address ? address.zipCode : "",
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
      if (formValues.state == 0 || formValues.state == "Select State") {
        alert("Select State!!!");
      } else {
        console.log(formValues);
        userService
          .setAddress(formValues)
          .then((res) => {
            console.log(res.data);
            sessionStorage.setItem("address", JSON.stringify(res.data));
            swal({
              title: "Address updated Successfully!!!",
              text: "",
              icon: "success",
              button: "",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(() => {
            alert("Error While updating Address details");
          });
      }
    }
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^\d{6}$/;

    if (!values.houseNo) {
      errors.houseNo = "House No.is Required!!!";
    }

    if (!values.street) {
      errors.street = "Street or landmark is Required!!!";
    }

    if (!values.city) {
      errors.city = "City is Required!!!";
    }

    if (!values.state) {
      errors.state = "State is Required!!!";
    }

    if (!values.country) {
      errors.country = "Country is Required!!!";
    }

    if (!values.zipCode) {
      errors.zipCode = "ZipCode is Required!!!";
    } else if (!regex.test(values.zipCode)) {
      errors.zipCode = "ZipCode should be number & should have length 6";
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      <hr />
      <Container>
        <Wrapper>
          <Title>My Address</Title><hr />
          {user.getAddress() && (
            <Textarea rows={2}>
              {user.getAddress().houseNo +
                ", " +
                user.getAddress().street +
                ", " +
                user.getAddress().city +
                ", " +
                user.getAddress().state +
                ", " +
                user.getAddress().country +
                ". Zipcode: " +
                user.getAddress().zipCode}
            </Textarea>
          )}
          <hr />
          <Form method="post" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>House No. :</th>
                  <td>
                    <Input
                      type="text"
                      name="houseNo"
                      placeholder="House No."
                      value={formValues.houseNo}
                      onChange={handleChange}
                    />
                    <font align="left" color="red">
                      {formErrors.houseNo}
                    </font>
                  </td>
                </tr>
                <tr>
                  <th>Street or Landmark :</th>
                  <td>
                    <Textarea
                      name="street"
                      placeholder="Street or Landmark"
                      value={formValues.street}
                      onChange={handleChange}
                      rows={2}
                    />
                    <font align="left" color="red">
                      {formErrors.street}
                    </font>
                  </td>
                </tr>
                <tr>
                  <th>City :</th>
                  <td>
                    <Input
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                    />
                    <font align="left" color="red">
                      {formErrors.city}
                    </font>
                  </td>
                </tr>
                <tr>
                  <th>State :</th>
                  <td>
                    <Select name="state" onClick={handleChange}>
                      <State />
                    </Select>
                    <font align="left" color="red">
                      {formErrors.state}
                    </font>
                  </td>
                </tr>
                <tr>
                  <th>Country :</th>
                  <td>
                    <Input
                      type="text"
                      name="country"
                      placeholder="country"
                      value={formValues.country}
                      onChange={handleChange}
                      disabled
                    />
                    <font align="left" color="red">
                      {formErrors.country}
                    </font>
                  </td>
                </tr>
                <tr>
                  <th>Country :</th>
                  <td>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="zipCode"
                      value={formValues.zipCode}
                      onChange={handleChange}
                    />
                    <font align="left" color="red">
                      {formErrors.zipCode}
                    </font>
                  </td>
                </tr>
              </tbody>
            </table>

            <br />
            <Button className="btn4 btn-dark">Update Address</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Address;
