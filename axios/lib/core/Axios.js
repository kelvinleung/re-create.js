import dispatchRequest from "./dispatchRequest";

function Axios(config) {
  this.defaults = config;
}

Axios.prototype.request = function (configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  if (!config.url) {
    throw new Error("Url not valid");
  }
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  config = { ...this.defaults, ...config };
  return Promise.resolve(config).then(dispatchRequest);
};

export default Axios;
