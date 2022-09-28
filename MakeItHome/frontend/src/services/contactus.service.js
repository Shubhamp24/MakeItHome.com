import httpClient from "../utils/http-common";
import user from "../utils/UserInfo";

const addCustomerQuery = (data) => {
  return httpClient.post("/contactus", data);
};

export default { addCustomerQuery };
