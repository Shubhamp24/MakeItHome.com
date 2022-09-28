import axios from 'axios';
import user from './UserInfo'

export default axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : user.IsLoggedIn?sessionStorage.getItem("token"):null
  }
});
