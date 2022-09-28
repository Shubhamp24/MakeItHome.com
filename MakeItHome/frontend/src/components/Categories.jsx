import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import categoryService from "../services/category.service";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import user from "../utils/UserInfo";
import { Link, useNavigate, useParams } from "react-router-dom";

// const Container = styled.div`
//   display: flex;
//   padding: 20px;
//   justify-content: space-between;
//   ${mobile({ padding: "0px", flexDirection: "column" })}
// `;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    categoryService
      .getAllCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <hr />
      {user.IsAdmin() && (
        <>
          <TopButton
            className="btn4 btn btn-info"
            onClick={() => navigate("/addcategory")}
          >
            ADD NEW CATEGORY
          </TopButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TopButton className="btn4 btn btn-info" onClick={()=>navigate("/addproduct")}>ADD NEW PRODUCT</TopButton>
        </>
      )}
      <Container>
        {categories.map((category) => (
          <CategoryItem item={category} key={category.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
