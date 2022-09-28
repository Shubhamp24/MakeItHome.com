import React from "react";
import Navbar from "./Navbar";
import "../css/contactus.css";
import { useState } from "react";
import swal from "sweetalert";
import contactusService from "../services/contactus.service";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const initialValues = { name: "", email: "", phoneNumber: "", message: "" };
  const [formValues, setFormValues] = useState(initialValues);
  let navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(formValues.phoneNumber.length==10){
        console.log(formValues)
        contactusService.addCustomerQuery(formValues)
        .then((res)=>{
            swal(res.data,"We will try to give reply as soon as possible","success");
            navigate("/");
        }).catch(()=>{
            console.log("error while posting query!!!");
        })
    }else{
        swal("Invalid Mobile Number!!!","Please Check","error")
    }
    
  }

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <>
      <Navbar />
      <hr />
      <div className="contact3 py-5">
        <div className="row no-gutters">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="card-shadow">
                  <img
                    src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-12860.jpg?w=1060&t=st=1664126987~exp=1664127587~hmac=95c3d26bf5ff7b0a874f8d66477fe68c1cf184baabc5aa232268211f20e8b07d"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-box ml-3">
                  <h1 className="font-weight-light mt-2">Quick Contact</h1>
                  <form className="mt-4" onSubmit={handleSubmit} method="post">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="name"
                            value={formValues.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="email address"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input
                            className="form-control"
                            type="number"
                            name="phoneNumber"
                            placeholder="phone"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <textarea
                            className="form-control"
                            rows="3"
                            name="message"
                            placeholder="message"
                            value={formValues.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="btn btn-danger-gradiant mt-3 text-white border-0 px-3 py-2"
                        >
                          <span> SUBMIT</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card mt-4 border-0 mb-4">
                  <div className="row">
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail pl-0">
                        <div className="mr-3 align-self-center">
                          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png" />
                        </div>
                        <div className="">
                          <h6 className="font-weight-medium">Address</h6>
                          <p className="">
                            Maharashtra
                            <br /> India
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail">
                        <div className="mr-3 align-self-center">
                          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                        </div>
                        <div className="">
                          <h6 className="font-weight-medium">Phone</h6>
                          <p className="">
                            7777777777
                            <br /> 7878787878
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail">
                        <div className="mr-3 align-self-center">
                          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                        </div>
                        <div className="">
                          <h6 className="font-weight-medium">Email</h6>
                          <p className="">
                            e.makeithome@gmail.com
                            <br /> info@makeithome.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
