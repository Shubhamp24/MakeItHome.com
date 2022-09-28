import userEvent from "@testing-library/user-event";

let IsLoggedIn=()=>sessionStorage.getItem("token")?true:false;
// let IsAdmin=()=>JSON.parse(sessionStorage.getItem("user")).role=="ADMIN";
let IsAdmin=()=>sessionStorage.getItem("role")=="ADMIN";
let getAddress=()=>JSON.parse(sessionStorage.getItem("address"));
let getEmail=()=>JSON.parse(sessionStorage.getItem("user")).email;
let getId=()=>JSON.parse(sessionStorage.getItem("user")).id;
let getName=()=>JSON.parse(sessionStorage.getItem("user")).firstName + " " + JSON.parse(sessionStorage.getItem("user")).lastName;
let getMobileNo=()=>JSON.parse(sessionStorage.getItem("user")).phoneNumber
export default {IsLoggedIn , IsAdmin, getAddress, getEmail, getName, getId,getMobileNo};