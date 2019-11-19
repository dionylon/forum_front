import API from "./api";
import axios from "axios";

const Request = {
  article(page = 1, size = 10){
    return axios.get(API.articles,{params: {page: page, size: size}});
  },
  recommend() {
    return axios.get(API.recommend+"?page=1&size=20");
  }
};

export default Request;
