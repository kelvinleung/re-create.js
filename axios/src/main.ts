import "./style.css";
import axios from "./lib";
import { Canceler } from "./lib/types";

const TEST_BASE_URL = "https://jsonplaceholder.typicode.com/";
const GET_API = "posts/1";
const GET_TEST_URL = TEST_BASE_URL + GET_API;

const getExampleButton = document.getElementById(
  "get-example"
) as HTMLButtonElement;
const getInstanceExampleButton = document.getElementById(
  "get-example-instance"
) as HTMLButtonElement;
const getMethodExampleButton = document.getElementById(
  "get-example-method"
) as HTMLButtonElement;
const cancelExampleButton = document.getElementById(
  "cancel-example"
) as HTMLButtonElement;
const cancelExampleCancelButton = document.getElementById(
  "cancel-example-cancel"
) as HTMLButtonElement;

getExampleButton.addEventListener("click", () => {
  axios(GET_TEST_URL).then((res) => {
    console.log(res);
  });
});

getInstanceExampleButton.addEventListener("click", () => {
  const instance = axios.create();
  instance.get(GET_TEST_URL).then((res) => {
    console.log(res);
  });
});

getMethodExampleButton.addEventListener("click", () => {
  axios.get(GET_TEST_URL).then((res) => {
    console.log(res);
  });
});

const interceptorExampleButton = document.getElementById(
  "interceptor-example"
) as HTMLButtonElement;

interceptorExampleButton.addEventListener("click", () => {
  const instance = axios.create();
  instance.interceptors.request.use((config) => {
    alert("这是拦截器");
    return config;
  });
  instance.get(GET_TEST_URL).then((res) => {
    console.log(res);
  });
});

let cancel: Canceler;

cancelExampleButton.addEventListener("click", () => {
  axios(GET_TEST_URL, {
    cancelToken: new axios.CancelToken((c) => {
      cancel = c;
    }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request aborted: ", err.message);
      } else {
        console.log(err.message);
      }
    });
});

cancelExampleCancelButton.addEventListener("click", () => {
  cancel("Manually canceled");
});
