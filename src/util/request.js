import axios from "axios";
const myAxios = axios;
const API = "http://localhost:8088/api";
const Request = {
  get(url,param){
    return myAxios.get(`${API}`+url,param);
  },
  getArticleById(id) {
    return myAxios.get(`${API}/article/`+id);
  },
  getArticlePage(page = 1, size = 10) {
    return myAxios.get(`${API}/article/page/` + page + `/size/` + size);
  },
  login(username, password) {
    let data = {"username":username, "password": password};
    return myAxios.post(`${API}/login`, data);
  },
  thumbUpArticle(userId, articleId) {
    // let data = { "userId": userId, "articleId": articleId};
    return myAxios.post(`${API}/article/thumbUp/`+userId+'/'+articleId);
  }
};

export default Request;
