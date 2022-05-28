// “假” React，esbuild 默认为解析 jsx 文件
import React from "./react";

const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from fake React</h2>
  </div>
);

const container = document.getElementById("app");

React.render(element, container);
