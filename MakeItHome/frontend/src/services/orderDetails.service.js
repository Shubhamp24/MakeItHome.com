import httpClient from "../utils/http-common";

const getAllOrders = () => {
  return httpClient.get("/admin/orders");
};

const getOrderDetailsByOrderId = (id) => {
  return httpClient.get("/orders/orderdetails/" + id);
};

export default { getAllOrders, getOrderDetailsByOrderId};
