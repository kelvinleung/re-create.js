// “假” React，esbuild 默认为解析 jsx 文件
import React from "./react";

function renderReconsiliation() {
  const container = document.getElementById("reconciliation");

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
}

function renderFunctionComponent() {
  function App(props) {
    return <h1>Hi {props.name}</h1>;
  }
  const element = <App name="foo" />;

  const container = document.getElementById("function-component-root");

  React.render(element, container);
}

// renderReconsiliation();
renderFunctionComponent();
