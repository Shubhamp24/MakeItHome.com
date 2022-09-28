import httpClient from "../utils/http-common";
import user from "../utils/UserInfo";

const addToWishList = (data) => {
  return httpClient.post("/wishlist/add", data);
};

const getWishList = () => {
  return httpClient.get("/wishlist");
};

const removeFromWishList=(id)=>{
  return httpClient.delete("/wishlist/"+id);
}

const clearWishList=()=>{
  return httpClient.delete("/wishlist");
}


// const getUserCart = () => {
//   return httpClient.get("/carts");
// };

// const addCartItemQty=(id)=>{
//   return httpClient.put("/carts/addqty/"+id);
// }

// const substractCartItemQty=(id)=>{
//   return httpClient.put("/carts/subqty/"+id);
// }

// const removeFromCart=(id)=>{
//   return httpClient.delete("/carts/delete/"+id);
// }

// const clearCart=()=>{
//   return httpClient.delete("/carts/user/"+user.getId());
// }


export default { addToWishList, removeFromWishList, getWishList, clearWishList};
