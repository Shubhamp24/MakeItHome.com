import React from "react";
import Categories from "./Categories";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Slider from "./Slider";


const Home = () => {

  return (
    <>
      <Navbar />
      <Slider/>
      {/* <Categories /> */}
      {/* <Products /> */}
      {/* <Newsletter /> */}
      <Footer />
    </>
  );
};

export default Home;
