// “假” React，esbuild 默认为解析 jsx 文件
import React from "./react";

const container = document.getElementById("app");

const updateValue = (e) => {
  rerender(e.target.value);
};

const rerender = (value) => {
  console.log(value);
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>
  );
  React.render(element, container);
};

rerender("World");
