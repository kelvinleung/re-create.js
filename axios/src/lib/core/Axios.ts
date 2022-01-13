import dispatchRequest from "./dispatchRequest";
import mergeConfig from "./mergeConfig";
import InterceptorManager from "./interceptorManager";
import {
  AxiosRequestConfig,
  AxiosResponse,
  InterceptorChain,
  Method,
  ResponsePromise,
} from "../types";

export default class Axios {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
  };
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  request(
    configOrUrl: AxiosRequestConfig | string,
    config?: AxiosRequestConfig
  ): ResponsePromise {
    /*
     * 支持以下两种写法：
     * axios("url", config)
     * axios(config)
     */
    if (typeof configOrUrl === "string") {
      config = (config || {}) as AxiosRequestConfig;
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    if (!config.url) {
      throw new Error("Url not valid");
    }
    // 合并配置
    config = mergeConfig(this.defaults, config);
    // 设置 method 的默认值
    if (config.method) {
      config.method = config.method.toLowerCase() as Method;
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase() as Method;
    } else {
      config.method = "get";
    }

    // 请求拦截器“链”
    const requestInterceptorChain: InterceptorChain<AxiosRequestConfig>[] = [];
    this.interceptors.request.forEach((interceptor) => {
      requestInterceptorChain.unshift(
        interceptor.fulfilled,
        interceptor.rejected
      );
    });
    // 响应拦截器“链”
    const responseInterceptorChain: InterceptorChain<AxiosResponse>[] = [];
    this.interceptors.response.forEach((interceptor) => {
      responseInterceptorChain.push(
        interceptor.fulfilled,
        interceptor.rejected
      );
    });

    // 拼接成 [请求拦截器, 请求, 响应拦截器] 请求链
    // undefined 的作用是“占位”，保证两两一组，分别作为 then(onFulfilled, onRejected)
    let chain: InterceptorChain<any>[] = [dispatchRequest, undefined];
    chain = requestInterceptorChain.concat(chain);
    chain = chain.concat(responseInterceptorChain);

    let promise: Promise<any> = Promise.resolve(config);

    while (chain.length) {
      // 遍历请求链，两两一组链式调用
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  get(url: string, config?: AxiosRequestConfig): ResponsePromise {
    return this.requestWithoutData("get", url, config);
  }

  private requestWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): ResponsePromise {
    config = mergeConfig(this.defaults, { method, url, ...config });
    return this.request(config);
  }
}
