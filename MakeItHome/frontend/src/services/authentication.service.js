import httpClient from "../utils/http-common";

const login = (data) => {
  return httpClient.post("/auth/signin", data);
};

const forgotPassword = (data) => {
  return httpClient.post("/auth/forgot", data);
};

const resetPassword = (data,code) => {
  return httpClient.put("/auth/reset/"+code, data);
};

const updatePasswordRequest=(data)=>{
  return httpClient.post("/profile/sendotp",data);
}

const updatePassword=(data)=>{
  return httpClient.put("/profile/updatepassword",data);
}

export default { login, forgotPassword, resetPassword, updatePasswordRequest,updatePassword };
