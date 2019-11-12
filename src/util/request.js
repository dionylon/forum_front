import API from "./api";
import axios from "axios";

const Request = {
  recommend() {
    return axios.get(API.recommend+"?page=1&size=20");
  }
};

export default Request;
