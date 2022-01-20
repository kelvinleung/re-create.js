import InterceptorManager from "./core/interceptorManager";
import CancelToken from "./cancel/CancelToken";

export interface Axios {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
  };
  request(
    configOrUrl: AxiosRequestConfig | string,
    config?: AxiosRequestConfig
  ): ResponsePromise;
  get(url: string, config?: AxiosRequestConfig): ResponsePromise;
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): ResponsePromise;
  (url: string, config?: AxiosRequestConfig): ResponsePromise;
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
  CancelToken: CancelTokenStatic;
}

export interface AxiosAdapter {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
}

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "post"
  | "POST"
  | "put"
  | "PUT";

export interface AxiosRequestConfig {
  method?: Method;
  url?: string;
  cancelToken?: CancelToken;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  config: AxiosRequestConfig;
}

export interface ResponsePromise extends Promise<AxiosResponse> {}

export interface FulfilledFn<T> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (error: any): any;
}

export interface Interceptor<T> {
  fulfilled: FulfilledFn<T>;
  rejected?: RejectedFn;
}

export interface InterceptorChain<T> {
  fulfilled: FulfilledFn<T> | ((config: AxiosRequestConfig) => ResponsePromise);
  rejected?: RejectedFn;
}

export interface Canceler {
  (message?: string): void;
}

export interface CancelExecutor {
  (cancel: Canceler): void;
}

interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken;
}
