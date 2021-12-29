import "./style.css";
import axios from "./lib/axios";

axios
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => console.log(res));

console.dir(axios);
