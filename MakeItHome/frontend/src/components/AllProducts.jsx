import styled from "styled-components";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../services/product.service";
import Navbar from "./Navbar";
import categoryService from "../services/category.service";
import {
  Search,
  ShoppingCartOutlined,
  FavoriteIcon,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import { mobile } from "../responsive";
import { NavDropdown } from "react-bootstrap";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Button = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${(props) => props.type === "filled" && "none"};
background-color: ${(props) =>
  props.type === "filled" ? "black" : "transparent"};
// color: ${(props) => props.type === "filled" && "white"};
color:black;
`;

const Title = styled.h1`
  font-size: 12px;
  font-weight: 300;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 5px;
  width:270px;
  border: 1px solid grey
`;

const Sort = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 5px;
  width:150px;
  border: 1px solid grey
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const AllProducts = () => {

  let navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  // const [searchItem, setSearchItem] =useState("");

  useEffect(() => {

    if(count==0){
    productService
      .getAllProducts()
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(() => {
        console.log("error while fetching products");
      });
    categoryService
      .getAllCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch(() => {
        console.log("error while fetching products");
      });
    }
  }, [count]);

  const filterProducts=(category)=>{
    productService
      .getAllProducts()
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.filter((prod)=>prod.categoryId.categoryName==category));
      })
      .catch(() => {
        console.log("error while fetching products");
      });
  }

  const searchProducts=(val)=>{
    productService
      .getAllProducts()
      .then((res) => {
        console.log(res.data);
        if(val==""){
          setProducts(res.data);
        }else{
          setProducts(res.data.filter((prod)=>prod.productName.toLowerCase().includes(val.toLowerCase())));
        }     
      })
      .catch(() => {
        console.log("error while fetching products");
      });
  }

  const sortByPriceHighToLow=()=>{
    productService
      .getAllProductsSortByPriceHighToLow()
      .then((res) => {
        console.log(res.data);
          setProducts(res.data);
      })
      .catch(() => {
        console.log("error while fetching products");
      });
  }

  const sortByPriceLowToHigh=()=>{
    productService
      .getAllProductsSortByPriceLowToHigh()
      .then((res) => {
        console.log(res.data);
          setProducts(res.data);
      })
      .catch(() => {
        console.log("error while fetching products");
      });
  }

  return (
    <>
      <Navbar />
      <hr /><SearchContainer>
            {/* <Input placeholder="Search" name="search" onChange={handleSearchChange} value={searchItem}/> */}
            <Input placeholder="Search" name="search" onChange={(e)=>searchProducts(e.target.value)}/>
            {/* <button onClick={searchProducts}><Search style={{ color: "gray", fontSize: 16 }} /></button> */}          
          </SearchContainer><b>Filter By : </b> &nbsp;&nbsp;&nbsp;
          
      {categories.map((category) => (<>
          <Button className="btn4 btn-info" onClick={()=>filterProducts(category.categoryName)}>{category.categoryName}</Button>&nbsp;&nbsp;&nbsp;</>
        ))}
        <Button className="btn4 btn-info" onClick={()=>{navigate("/allproducts");window.location.reload()}}>All</Button>
        <Sort>
          <NavDropdown title={"Sort By Price"} id="navbarScrollingDropdown">
              <NavDropdown.Item> <button style={{border:"none",backgroundColor:"white"}} onClick={sortByPriceHighToLow}>High To Low</button></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item><button style={{border:"none",backgroundColor:"white"}} onClick={sortByPriceLowToHigh}>Low To High</button></NavDropdown.Item>
            </NavDropdown>
        </Sort>
      <Container>
        {products.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default AllProducts;
