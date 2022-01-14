import { AxiosRequestConfig, ResponsePromise } from "../types";

export default function xhrAdapter(
  config: AxiosRequestConfig
): ResponsePromise {
  return new Promise((resolve, reject) => {
    let request: XMLHttpRequest | null = new XMLHttpRequest();
    request.open(config.method!.toUpperCase(), config.url!);
    request.onreadystatechange = function handleLoad() {
      if (!request) {
        return;
      }
      if (request.readyState !== 4) {
        return;
      }
      if (request.status >= 200 && request.status < 300) {
        const response = {
          data: request.response,
          status: request.status,
          statusText: request.statusText,
          config,
        };
        resolve(response);
      } else {
        reject(request.status);
      }
      request = null;
    };
    request.send();
  });
}
