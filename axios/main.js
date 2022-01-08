import "./style.css";
import axios from "./lib/axios";

const TEST_BASE_URL = "https://jsonplaceholder.typicode.com/";
const GET_API = "posts/1";

const getExampleButton = document.getElementById("get-example");

getExampleButton.addEventListener("click", () => {
  const url = TEST_BASE_URL + GET_API;
  axios.get(url).then((res) => {
    alert(res);
  });
});

const interceptorExampleButton = document.getElementById("interceptor-example");

interceptorExampleButton.addEventListener("click", () => {
  const url = TEST_BASE_URL + GET_API;
  const instance = axios.create();
  instance.interceptors.request.use((config) => {
    alert("这是拦截器");
    return config;
  }, null);
  instance.get(url).then((res) => {
    alert(res);
  });
});
