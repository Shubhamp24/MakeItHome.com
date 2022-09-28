import styled from "styled-components";
import { mobile } from "../responsive";
import { Link,  useNavigate, useParams } from "react-router-dom";
import user from "../utils/UserInfo";

// const Container = styled.div`
//   flex: 1;
//   margin: 3px;
//   height: 70vh;
//   position: relative;
// `;

const Image = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
`;

const Title = styled.h4`
    color:black;
    margin-top: 0px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
`;

// const Button = styled.button`
//     border:none;
//     padding: 10px;
//     background-color: teal;
//     color:white;
//     cursor: pointer;
//     font-weight: 600;
// `;

// const Info = styled.div`
//   opacity: 0;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.2);
//   z-index: 3;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.5s ease;
//   cursor: pointer;
// `;

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
    opacity: 2;
  }
  border: 1px solid grey
`;

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

// const Image = styled.img`
//   height: 75%;
//   z-index: 2;
// `;

// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   transition: all 0.5s ease;
//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1);
//   }
// `;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

// const Title = styled.h5`
//     color:black;
//     margin-bottom: 20px;
//     -webkit-text-stroke-width: 1px;
//     -webkit-text-stroke-color: black;
// `;

// const Desc = styled.p`
//   margin: 50px 0px;
//   font-size: 20px;
//   font-weight: 500;
//   letter-spacing: 3px;
// `;


const CategoryItem = (props) => {

  let navigate=useNavigate();

  const getProducts=(id)=>{
    navigate("/products/category/"+id);
  }

  return (
    <>
    <Container>
      <Image src={require("../"+props.item.imagePath.replace("\\","/"))} alt={"image not found"}/>
      <Info>
        <Title>{props.item.categoryName}</Title>
        {!user.IsAdmin()?
        <Button onClick={()=>getProducts(props.item.id)}>SHOP NOW</Button>:
        <>
        <Button onClick={()=>getProducts(props.item.id)}>View Products</Button>
        </>
        }
      </Info>
    </Container>
    </>

  );
};

export default CategoryItem;
