import httpClient from "../utils/http-common";
import user from "../utils/UserInfo";

const getAllOrders = () => {
  return httpClient.get("/admin/orders");
};

const getAllPendingOrders = () => {
  return httpClient.get("/admin/pendingorders");
};

const getAllCancelledOrders = () => {
  return httpClient.get("/admin/cancelledorders");
};

const getAllShippedOrders = () => {
  return httpClient.get("/admin/shippedorders");
};

const approveOrder = (id) => {
  return httpClient.put("/admin/approveorder/" + id);
};

const cancelOrder = (id) => {
  return httpClient.put("/admin/cancelorder/" + id);
};

const cancelUserOrder = (id) => {
  return httpClient.put("/orders/user/cancelorder/" + id);
};

const getAllUserOrders = () => {
  return httpClient.get("/orders/user/" + user.getId());
};

const getUserOrders = (id) => {
  return httpClient.get("/orders/user/" + id);
};

const createOrder = (data) => {
  return httpClient.post("/orders/create",data);
};

const storePaymentDetails=(data)=>{
  return httpClient.post("/orders/razorpayment",data);
}

export default {
  getAllOrders,
  approveOrder,
  getAllPendingOrders,
  getAllCancelledOrders,
  getAllShippedOrders,
  cancelOrder,
  getAllUserOrders,
  cancelUserOrder,
  getUserOrders,
  createOrder,
  storePaymentDetails
};
