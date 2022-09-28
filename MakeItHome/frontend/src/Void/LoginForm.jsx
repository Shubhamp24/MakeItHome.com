import React, { useEffect, useState } from "react";
import authenticationService from "../services/authentication.service";
import { Link,  useNavigate, useParams } from "react-router-dom";
import check from "../utils/UserInfo";

const LoginForm = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);

  const navigate=useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(()=>{
    if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
        authenticationService.login(formValues)
        .then(res=>{
            console.log(res.data);
            sessionStorage.setItem("token","Bearer "+res.data.jwt);
            sessionStorage.setItem("user",JSON.stringify(res.data.user));
            console.log(sessionStorage.getItem("token"));
            console.log(sessionStorage.getItem("user"));
            console.log("User is logged in : "+check.IsLoggedIn());
            console.log("User is ADMIN : "+check.IsAdmin());
          }).catch(()=>{
            alert("Invalid Credentials...Please try again");
            console.log("User is logged in : "+check.IsLoggedIn());
        })
    }
  },[formErrors])

  const validate = (values) => {
    const errors = {};
    const regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpass=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if(!values.email){
        errors.email = "Email is Required";
    }else if(!regex.test(values.email)){
        errors.email = "Invalid email format";
    }

    if(!values.password){
        errors.password = "Password is Required";
    }else if(!regexpass.test(values.password)){
        errors.password = "Password should have Minimum six characters, at least one letter, one number and one special character";
    }
    return errors;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
