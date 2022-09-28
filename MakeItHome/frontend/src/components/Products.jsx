import styled from "styled-components";
import { popularProducts } from "../data";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../services/product.service";
import Navbar from "./Navbar";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(()=>{
    productService
      .getAllProductsByCategoryId(id)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(() => {
        console.log("error while fetching products");
      });
  },[])

return (
    <>
    <Navbar/>
    <hr />
    <Container>
      {products.map((item) => (
        <ProductItem item={item} key={item.id}/>
      ))}
    </Container>
    </>
  );
};

export default Products;
