import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TextArea } from "semantic-ui-react";
import styled from "styled-components";
import State from "./State";
import user from "../utils/UserInfo";
import swal from "sweetalert";
import orderService from "../services/order.service";
import logo from "../../src/logo.svg";
import userService from "../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vx;
  height: 90vh;
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

const Checkout = () => {

  const {amt} =useParams();
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

  // load razor pay script
  function loadRazorpayScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (formValues.state == 0 || formValues.state=="Select State") {
        alert("Select State!!!");
      } else {
        displayRazorpayPaymentSdk();
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

  async function displayRazorpayPaymentSdk() {
    console.log(formValues);
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
    }

    //   creating a new order and sending details to backend
    const result = await orderService.createOrder(formValues);

    console.log(result.data);

    if (!result) {
      alert("Server error. please check are you onlin?");
      return;
    }

    //   Getting the order details back
    const { amount, currency, id } = result.data;
    console.log(amount);
    console.log(currency);
    console.log(id);

    const options = {
      key: "rzp_test_xiN8F3GDUmFAGY",
      amount: amount,
      currency: currency,
      name: "MakeItHome.com",
      description: "Shopping",
      image: require("../logo/home.PNG"),
      order_id: id,
      //   callback_url: "http://localhost:3000/",
      //   callback_method: "get",
      handler: function (response) {
        // alert(" Your Payment ID: " + response.razorpay_payment_id);
        // alert(" Your Order ID: " + response.razorpay_order_id);
        // alert(" Your Signature ID: " + response.razorpay_signature);
        swal("Your order has been placed successfully!!!", "Shop Again", "success");
        navigate("/");
        orderService.storePaymentDetails(response)
        .then((res) => {
          console.log(res.data);
        }).catch(()=>{
          console.log("Error occured while placing order");
        });
      },
      redirect: true,
      prefill: {
        name: user.getName(),
        email: user.getEmail(),
        contact: user.getMobileNo(),
      },
      notes: {
        address: "None",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  //

  return (
    <>
      <Navbar />
      <hr />
      <Container>
        <Wrapper>
          <Title>Enter Shipping Address</Title>
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
                      rows={4}
                    />
                    <font align="left" color="red">
                      {formErrors.street}
                    </font>
                  </td>
                </tr>
                <tr>
                  <th>City :</th>
                  <td>
                    <Input type="text" name="city" value={formValues.city} onChange={handleChange}/>
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
                  <th>Zipcode :</th>
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
                <tr>
                  <td colSpan={2}><hr /></td>
                </tr>
                <tr>
                  <th><h3>Total Amount : <u>₹ {amt}</u></h3></th>
                  <td><Button className="btn4 btn-dark">Pay Now</Button></td>
                </tr>
              </tbody>
            </table>
            <br />
            
          </Form>
        </Wrapper>
      </Container>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Razorpay Payments ! Try it Once </p>
        <button className="App-link" onClick={displayRazorpayPaymentSdk}>
          Pay Now To Test
        </button>
      </header> */}
    </>
  );
};

export default Checkout;
