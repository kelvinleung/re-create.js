import defaults from "../defaults";
import { AxiosRequestConfig, ResponsePromise } from "../types";

export default function dispatchRequest(
  config: AxiosRequestConfig
): ResponsePromise {
  const adapter = config.adapter || defaults.adapter!;
  return adapter(config).then(
    (response) => {
      return response;
    },
    (reason) => {
      return Promise.reject(reason);
    }
  );
}
