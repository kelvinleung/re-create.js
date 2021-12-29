import dispatchRequest from "./dispatchRequest";
import mergeConfig from "./mergeConfig";

function Axios(config) {
  this.defaults = config;
}

Axios.prototype.request = function (configOrUrl, config) {
  /*
   * 支持以下两种写法：
   * axios("url", config)
   * axios(config)
   */
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  if (!config.url) {
    throw new Error("Url not valid");
  }
  // 设置 method 的默认值
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  // 合并配置
  config = mergeConfig(this.defaults, config);
  // 把 config 值传给下一个 promise，即 dispatchRequest(config)
  return Promise.resolve(config).then(dispatchRequest);
};

["get"].forEach(function forEachMethodWithoutData(method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, { method, url }));
  };
});

export default Axios;
