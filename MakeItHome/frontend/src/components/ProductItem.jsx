import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  FavoriteIcon
} from "@material-ui/icons";
import styled from "styled-components";
import productService from "../services/product.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import wishlistService from "../services/wishlist.service";
import user from "../utils/UserInfo";
import swal from "sweetalert";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const Title = styled.h5`
    color:black;
    margin-bottom: 20px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const ProductItem = (props) => {

  let navigate=useNavigate();

  const showProductDetails=(prodId)=>{
    navigate("/products/"+prodId);
  }

  const addToWishList=(product)=>{
    console.log(product);
    wishlistService.addToWishList(product)
    .then((res)=>{
        swal(res.data,"","success");
    }).catch((err)=>{
        swal(err.response.data.message,"","info");
    })
  }

  return (
    <div>
     <Container>
      <Circle />
      <Image src={require("../"+props.item.imagePath.replace("\\","/"))}/>
      <Info>
        {user.IsLoggedIn() && !user.IsAdmin() &&
        <button style={{background:"transparent",border:"none"}} onClick={()=>{addToWishList(props.item)}}>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
        </button>
        }
        <Button onClick={()=>showProductDetails(props.item.id)}>VIEW DETAILS</Button>
      </Info>
    </Container>
    <Title>{props.item.productName}</Title>
    <Desc>Price : ₹{props.item.price}</Desc>
    <hr />
    </div>
  );
}

export default ProductItem;