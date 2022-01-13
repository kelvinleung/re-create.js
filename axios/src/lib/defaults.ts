import xhrAdapter from "./adapters/xhr";
import { AxiosRequestConfig } from "./types";

const defaults: AxiosRequestConfig = {
  adapter: xhrAdapter,
};

export default defaults;
