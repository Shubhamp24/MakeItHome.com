import httpClient from "../utils/http-common";

const addproduct = (data) => {
  return httpClient.post("/admin/addproduct", data);
};

const addproductimage = (data, id) => {
  return httpClient.post(`/admin/category/${id}/image`, data);
};

const getAllProducts = () => {
  return httpClient.get("/products");
};

const getProductById = (id) => {
  return httpClient.get("/products/" + id);
};

const getAllProductsByCategoryId = (id) => {
  return httpClient.get("/products/category/" + id);
};

const deleteProductById = (id) => {
  return httpClient.delete("/admin/deleteproduct/" + id);
};

const updateProduct = (data) => {
  return httpClient.put("/admin/updateproduct",data);
};

const updateProductWithoutImage = (data,id) => {
  return httpClient.put("/admin/updateproduct/"+id,data);
};

const getAllProductsSortByPriceHighToLow=()=>{
  return httpClient.get("/products/sortbyprice/hightolow");
}

const getAllProductsSortByPriceLowToHigh=()=>{
  return httpClient.get("/products/sortbyprice/lowtohigh");
}

export default {
  addproduct,
  addproductimage,
  getAllProducts,
  getAllProductsByCategoryId,
  getProductById,
  deleteProductById,
  updateProduct,
  updateProductWithoutImage,
  getAllProductsSortByPriceHighToLow,
  getAllProductsSortByPriceLowToHigh
};
