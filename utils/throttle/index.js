import { throttleWithTimestamp, throttleWithTimer, throttle } from "./throttle";
import "../style.css";
import "./throttle.css";
const TEST_INTERVAL = 1000;

// 时间戳
const timestampDiv = document.getElementById("timestamp");

let timestampCount = 0;
const timestampHandler = throttleWithTimestamp(() => {
  timestampDiv.innerText = timestampCount++;
}, TEST_INTERVAL);

timestampDiv.addEventListener("mousemove", timestampHandler);

// 定时器
const timerDiv = document.getElementById("timer");

let timerCount = 0;
const timerHandler = throttleWithTimer(() => {
  timerDiv.innerText = timerCount++;
}, TEST_INTERVAL);

timerDiv.addEventListener("mousemove", timerHandler);

// 组合
const mixDiv = document.getElementById("mix");

let mixCount = 0;
const mixHandler = throttle(() => {
  mixDiv.innerText = mixCount++;
}, TEST_INTERVAL);

mixDiv.addEventListener("mousemove", mixHandler);
