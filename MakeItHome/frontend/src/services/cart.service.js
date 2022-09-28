import httpClient from "../utils/http-common";
import user from "../utils/UserInfo";

const addItemToCart = (data) => {
  return httpClient.post("/carts/addtocart", data);
};

const getUserCart = () => {
  return httpClient.get("/carts");
};

const addCartItemQty=(id)=>{
  return httpClient.put("/carts/addqty/"+id);
}

const substractCartItemQty=(id)=>{
  return httpClient.put("/carts/subqty/"+id);
}

const removeFromCart=(id)=>{
  return httpClient.delete("/carts/delete/"+id);
}

const clearCart=()=>{
  return httpClient.delete("/carts/user/"+user.getId());
}


export default { addItemToCart, getUserCart, addCartItemQty, substractCartItemQty , removeFromCart, clearCart};
