import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignOut = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.length !== 0)
      // alert("You have logged out successfully!!!");
      swal("You have logged out successfully!!!", "", "success");
    sessionStorage.clear();
    navigate("/");
  }, []);

  return <div>SignOut</div>;
};

export default SignOut;
