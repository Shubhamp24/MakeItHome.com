// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Card, CardBody, CardImg } from "reactstrap";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import user from "../utils/UserInfo";
// import cartService from "../services/cart.service";

// const ProductCard = (props) => {
//   const [products, setProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const { id } = useParams();

//   const fetchProducts = (props) => {
//     axios
//       .get("http://localhost:8080/api/v1/products/category/" + id)
//       .then((res) => {
//         console.log(res.data);
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const quantityHandler = (e) => {
//     // e.preventDefault();
//     setQuantity(e.target.value);
//   };

//   const addToProduct = (product) => {
//     const cartItem = {
//       productId: product.id,
//       quantity: quantity,
//     };
//     console.log(cartItem);
//     if (user.IsLoggedIn() && !user.IsAdmin()) {
//       cartService
//         .addItemToCart(cartItem)
//         .then((res) => {
//           console.log(res.data);
//           console.log("in add to cart");
//         })
//         .catch(() => {
//           console.log("Error while adding item to cart");
//         });
//     } else {
//       navigate("/login");
//       console.log("in else");
//     }
//   };

//   return (
//     <div>
//       <h2>Products</h2>
//       <div className="item-container">
//         {products.map((product) => (
//           <CardBody key={product.id}>
//             <div align="left">
//               <img
//                 src={
//                   "https://rukminim1.flixcart.com/image/416/416/kp8ntzk0/sofa-set/w/g/9/grey-cotton-md-ss-0168-3-2-1-mahimart-and-handicrafts-brown-original-imag3gz8tw6jyzxh.jpeg?q=70"
//                 }
//                 alt=""
//                 height={200}
//                 width={200}
//                 align="left"
//               />
//             </div>
//             <div align="left">
//               <h3>{product.productName}</h3>
//               <p>{product.productDescription}</p>
//               <h6>Price : {product.price} Rs.</h6>
//               <h6>Available Qty. : {product.stock}</h6>
//               select Qty :{" "}
//               <input
//                 type="number"
//                 name={product.productName}
//                 id={product.id}
//                 min={1}
//                 max={product.stock}
//                 onChange={quantityHandler}
//                 value={quantity}
//               />
//               <Button color="info" onClick={() => addToProduct(product)}>
//                 Add To Cart
//               </Button>{" "}
//             </div>
//             <br />
//             <br />
//             <br />
//           </CardBody>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
