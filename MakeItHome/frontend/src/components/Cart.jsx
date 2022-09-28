import {
  AddCircle,
  RemoveCircle,
  DeleteForever,
  Delete,
  Add,
} from "@material-ui/icons";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import cartService from "../services/cart.service";
import user from "../utils/UserInfo";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: none;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

// const ProductId = styled.span``;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
// `;

// const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Btn = styled.button`
  width: 150px;
  border: none;
  padding: 10px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState([0.0]);
  const [flag,setFlag] = useState(false);

  let navigate=useNavigate();

  useEffect(() => {
    fetchCart();
  }, [flag]);

  const fetchCart = () => {
    if (user.IsLoggedIn() && !user.IsAdmin()) {
      cartService.getUserCart().then((res) => {
        console.log(res.data);
        setCart(res.data.cartItems);
        setCartPrice(res.data.totalCost);
      });
    }
  };

  const clearCart = () => {
    cartService
      .clearCart()
      .then((res) => {
        console.log(res.data);
        swal({
          title: res.data,
          text: "",
          icon: "success",
          button: "OK",
        });
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
        swal(err.response.data.message, "", "info");
      });
  };

  return (
    <Container>
      {console.log(
        "carts : " +
          cart.map((v) => {
            console.log(v);
          }) +
          "  " +
          cartPrice
      )}
      <Navbar />
      <hr />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopButton
            style={{ marginRight: 700, color: "black" }}
            onClick={clearCart}
          >
            CLEAR CART
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.length})</TopText>
            {sessionStorage.setItem("cartSize", cart.length)}
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.map((item) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image
                      src={require("../" +
                        item.product.imagePath.replace("\\", "/"))}
                    />
                    <Details>
                      <ProductName>
                        <b>Product : {item.product.productName}</b>
                      </ProductName>
                      <ProductName>
                        <b>Category : {item.product.categoryId.categoryName}</b>
                      </ProductName>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <a
                        href={"/subcartqty/" + item.id}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <RemoveCircle />
                      </a>
                      <ProductAmount>{item.quantity}</ProductAmount>
                      <a
                        href={"/addcartqty/" + item.id}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <AddCircle />
                      </a>
                    </ProductAmountContainer>
                    <ProductPrice> ₹{item.product.price}</ProductPrice>
                  </PriceDetail>
                  <a
                    href={"/removecartitem/" + item.id}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      marginRight: 20,
                    }}
                  >
                    <Delete>Remove Item</Delete>
                  </a>
                </Product>
                <hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice> ₹ {cartPrice}</SummaryItemPrice>
            </SummaryItem>
            {cartPrice != 0 && (
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>₹ 40</SummaryItemPrice>
              </SummaryItem>
            )}
            {cartPrice != 0 && (
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>₹ -40</SummaryItemPrice>
              </SummaryItem>
            )}
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cartPrice}</SummaryItemPrice>
            </SummaryItem>
            {cartPrice != 0 && 
            <Button onClick={()=>navigate("/checkout/"+cartPrice)}>CHECKOUT NOW</Button>
            }
            {cartPrice == 0 && 
            <Button onClick={()=>swal("Nothing To Order","Add Products to cart","info")}>CHECKOUT NOW</Button>
            }
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
