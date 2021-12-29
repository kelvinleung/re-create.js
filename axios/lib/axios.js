import Axios from "./core/Axios";
import defaults from "./defaults";
import utils from "./utils";
import mergeConfig from "./core/mergeConfig";

function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  // instance 即 request
  const instance = Axios.prototype.request.bind(context);
  // 将 Axios 原型上的方法加到 instance 上
  utils.extend(instance, Axios.prototype, context);
  // 将 Axios 实例上的属性加到 instance 上
  utils.extend(instance, context);
  // instance 即为函数，又为对象
  return instance;
}

const axios = createInstance(defaults);

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

export default axios;
