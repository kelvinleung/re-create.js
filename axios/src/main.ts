import "./style.css";
import axios from "./lib";

const TEST_BASE_URL = "https://jsonplaceholder.typicode.com/";
const GET_API = "posts/1";
const GET_TEST_URL = TEST_BASE_URL + GET_API;

const getExampleButton = document.getElementById("get-example");
const getInstanceExampleButton = document.getElementById(
  "get-example-instance"
);
const getMethodExampleButton = document.getElementById("get-example-method");

getExampleButton.addEventListener("click", () => {
  axios(GET_TEST_URL).then((res) => {
    alert(res);
  });
});

getInstanceExampleButton.addEventListener("click", () => {
  const instance = axios.create();
  instance.get(GET_TEST_URL).then((res) => {
    alert(res);
  });
});

getMethodExampleButton.addEventListener("click", () => {
  axios.get(GET_TEST_URL).then((res) => {
    alert(res);
  });
});

const interceptorExampleButton = document.getElementById("interceptor-example");

interceptorExampleButton.addEventListener("click", () => {
  const instance = axios.create();
  instance.interceptors.request.use((config) => {
    alert("这是拦截器");
    return config;
  }, null);
  instance.get(GET_TEST_URL).then((res) => {
    alert(res);
  });
});
