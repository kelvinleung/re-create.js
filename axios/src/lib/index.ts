import Axios from "./core/Axios";
import defaults from "./defaults";
import utils from "./utils";
import mergeConfig from "./core/mergeConfig";
import { AxiosRequestConfig, AxiosStatic } from "./types";

function createInstance(defaultConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(defaultConfig);
  // instance 即 request
  const instance = context.request.bind(context);
  // 将 Axios 原型上的方法加到 instance 上
  utils.extend(instance, Axios.prototype, context);
  // 将 Axios 实例上的属性加到 instance 上
  utils.extend(instance, context);
  // instance 即为函数，又为对象
  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(instanceConfig: AxiosRequestConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

export default axios;
