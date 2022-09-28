import React from "react";
import "../css/aboutus.css";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <hr />
      <div className="py-5 service-26">
        <div className="container">
          <div className="row wrap-service-26" style={{marginLeft:"50%",fontSize:"25px",color:"black",fontWeight:"500"}}>
           ABOUT US
          </div>
          <div className="row wrap-service-26 mt-4 pt-3">
            <div className="col-md-6">
              <img
                src="https://cdn.ddecor.com/media/catalog/product/cache/cf0f8cbc2ab403ba01f41fcd20425522/5/c/5cf63237ca6f4_jupcbe7bsd7ftm8w.jpg"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 align-self-center">
              <span className="badge badge-info rounded-pill px-3 py-1 font-weight-light">
                MakeItHome
              </span>
              <h3 className="mt-3">
                Get the best home decor {"&"} furniture products to make your
                home look modern!!!
              </h3>
              <p className="mt-3">
                You can relay on our amazing features list and also our customer
                services will be great experience for you without doubt and in
                no-time and with great quality of home decor and furniture
                products.
              </p>
              <p>
                <b>OUR MISSION</b> <br />
                Making homes beautiful in every street, in every
                city, of every country in the world. 
                <br /><br />
                <b>VISION</b><br />
                Becoming the ultimate choice for soft furnishing 
                solutions across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
