import httpClient from "../utils/http-common";

const addcategory = (data) => {
  return httpClient.post("/admin/addcategory", data);
};

const addcategoryimage = (data, id) => {
  return httpClient.post(`/admin/category/${id}/image`, data);
};

const getAllCategories = () => {
  return httpClient.get("/categories");
};

const getCategoryById = (id) => {
  return httpClient.get("/categories/" + id);
};

const updateCategory = (data) => {
  return httpClient.put("/admin/updatecategory", data);
};

const updateCategoryWithoutImage = (data, id) => {
  return httpClient.put("/admin/updatecategory/" + id, data);
};

const deleteCategoryById = (id) => {
  return httpClient.delete("/admin/deletecategory/" + id);
};

const getCategoryWiseSales=()=>{
  return httpClient.get("/admin/getsales");
}

export default {
  addcategory,
  addcategoryimage,
  getAllCategories,
  getCategoryById,
  updateCategory,
  updateCategoryWithoutImage,
  deleteCategoryById,
  getCategoryWiseSales
};
