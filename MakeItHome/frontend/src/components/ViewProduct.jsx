import React, { useEffect, useState } from "react";
import productService from "../services/product.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "./Navbar";
import user from "../utils/UserInfo";
import cartService from "../services/cart.service";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 40px;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Btn = styled.button`
  padding: 5x;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
`;

const ViewProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    productService
      .getProductById(id)
      .then((res) => {
        console.log(res.data+" ******");
        setProduct(res.data);
        console.log(product+"  ******");
      })
      .catch(() => {
        console.log("error while fetching products");
      });
  }, []);

  const optionValues = (stock) => {
    let list = [];
    for (let index = 1; index <= stock; index++) {
      list.push(index);
    }
    let listValues = list.map((val, id) => (
      <option value={val} key={id}>
        {val}
      </option>
    ));
    return listValues;
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const addToCart = (id) => {
    if (!quantity == 0) {
      const cartItem = {
        productId: id,
        quantity: +quantity,
      };
      console.log(cartItem);
      if (user.IsLoggedIn() && !user.IsAdmin()) {
        cartService
          .addItemToCart(cartItem)
          .then((res) => {
            console.log(res.data);
            alert("Added To Cart");
            navigate("/carts");
            setTimeout(()=>{
              navigate(-1);
            },50) 
          })
          .catch(() => {
            console.log("Error while adding item to cart");
          });
      } else {
        localStorage.setItem("tempId",id);
        navigate("/login");
        console.log("in else");
      }
    } else {
      alert("Select Quanity First");
    }
  };

  return (
    <>
      <Navbar />
      <hr />
      <Container>
        <ImgContainer>
          {
            product.imagePath &&
          <Image
            src={require("../" + product.imagePath.replace("\\", "/"))}
          />
        }
        </ImgContainer>
        <InfoContainer>
          <Title>{product.productName}</Title>
          <Desc>
            {product.productDescription}
            <br />
            Price : ₹{product.price}
            <br /><br />
            {!user.IsAdmin() && product.stock!=0 &&
            <select name="quantity" id={product.id} onChange={handleChange}>
              <option defaultValue={1} selected disabled>
                Select Quantity
              </option>
              {optionValues(product.stock)}
            </select>
            }
          </Desc>
          {!user.IsAdmin() && product.stock!=0 &&
          <Button onClick={() => addToCart(product.id)}>ADD TO CART</Button>
          }
          {!user.IsAdmin() && product.stock==0 &&
          <h4 style={{color:"red"}}>OUT OF STOCK</h4>
          }
          <p>
            <br />
          <Button onClick={() => navigate(-1)}>Go To Previous Page</Button>

          </p>
        </InfoContainer>
      </Container>
      
    </>
  );
};

export default ViewProduct;
