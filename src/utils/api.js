import axios from "axios";
import cookie from "react-cookies";

const token = cookie.load("token");

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: token?{'Authorization': 'Bearer '+token}:null
  });