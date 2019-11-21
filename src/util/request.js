import API from "./api";
import axios from "axios";
const myAxios = axios;
const Request = {
  getArticlePage(page = 1, size = 10){
    return myAxios.get(API.articles,{params: {page: page, size: size}});
  },
  recommend() {
    return myAxios.get(API.recommend+"?page=1&size=10");
  },
  login(username, password) {
    let data = {"username":username, "password": password};
    return myAxios.post(API.login, data);
  }
};

export default Request;
