import axios from './axios';

const API = "http://localhost:8088/api";
const Request = {
  get(url,param){
    return axios.get(`${API}`+url,param);
  },
  post(url,data){
    return axios.post(`${API}`+url,data);
  },
  getArticleById(id) {
    return axios.get(`${API}/article/`+id);
  },
  getArticlePage(page = 1, size = 10) {
    return axios.get(`${API}/article/page/` + page + `/size/` + size);
  },
  login(username, password) {
    let data = {"username":username, "password": password};
    return axios.post(`${API}/login`, data);
  },
  thumbUpArticle(userId, articleId) {
    // let data = { "userId": userId, "articleId": articleId};
    return axios.post(`${API}/article/thumbUp/`+userId+'/'+articleId);
  }
};

export default Request;
