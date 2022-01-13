import InterceptorManager from "./core/interceptorManager";

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
  <T = any>(config: AxiosRequestConfig): Promise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
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
  adapter: AxiosAdapter;
  method?: Method;
  url?: string;
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
  rejected: RejectedFn;
}

export type InterceptorChain<T> =
  | FulfilledFn<T>
  | ((config: AxiosRequestConfig) => ResponsePromise)
  | RejectedFn
  | undefined;
