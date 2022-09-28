// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Card, CardBody, CardImg } from 'reactstrap';
// import ProductCard from './ProductCard';
// import { Link,  useNavigate, useParams } from "react-router-dom";
// import categoryService from '../services/category.service';

// const CategoryCard = () => {
//   const [categories, setCategories] = useState([]);
//   const [productList,setProductList] = useState([]);

//   const navigate=useNavigate();

// useEffect(() => {
//   fetchCategories();
// }, []);
// const fetchCategories = () => {
//   categoryService
//     .getAllCategories()
//     .then((res) => {
//       console.log(res);
//       setCategories(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const getProducts=(id)=>{
//     navigate("/products/"+id);
// }

// return (
//     <div>
//       <h1>Featured Categories</h1>
//       <div className='item-container'>
//         {categories.map((category) => (
//           <CardBody key={category.id}>
//             <img src={'https://rukminim1.flixcart.com/image/416/416/kp8ntzk0/sofa-set/w/g/9/grey-cotton-md-ss-0168-3-2-1-mahimart-and-handicrafts-brown-original-imag3gz8tw6jyzxh.jpeg?q=70'} alt='' height={200} width={200}/>
//             <h3>{category.categoryName}</h3>
//             <Button color="info" onClick={()=>getProducts(category.id)}>View Products</Button>{' '}
//           </CardBody>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;