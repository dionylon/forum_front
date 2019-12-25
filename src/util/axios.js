import axios from "axios";

axios.interceptors.request.use(function (config) {
  // 带上token
  config.headers.common["token"]=localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  return config;
}, function (error) {
  return Promise.reject(error);
});
export default axios;