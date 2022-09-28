import httpClient from '../utils/http-common';

const getAllCustomers = () => {
  return httpClient.get("/admin/users");
};

const registerUser = (data) => {
  return httpClient.post('/auth/signup', data);
};

const get = (id) => {
  return httpClient.get(`${id}`);
};

const update = (data) => {
  return httpClient.put('', data);
};

const remove = (id) => {
  return httpClient.delete(`/${id}`);
};

const setAddress = (data) => {
 
  return httpClient.post('/profile/setaddress',data);
  
};

const updateprofile = (data) => {
  return httpClient.put('/profile/update', data);
};


export default { getAllCustomers, registerUser, get, update, remove ,setAddress,updateprofile};
