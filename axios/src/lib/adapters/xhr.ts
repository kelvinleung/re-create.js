import { AxiosRequestConfig, ResponsePromise } from "../types";

export default function xhrAdapter(
  config: AxiosRequestConfig
): ResponsePromise {
  return new Promise((resolve, reject) => {
    const { method, url, cancelToken } = config;
    let xhr: XMLHttpRequest | null = new XMLHttpRequest();
    xhr.open(method!.toUpperCase(), url!);
    xhr.onreadystatechange = function handleLoad() {
      if (!xhr) {
        return;
      }
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = {
          data: xhr.response,
          status: xhr.status,
          statusText: xhr.statusText,
          config,
        };
        resolve(response);
      } else {
        reject(xhr.status);
      }
      xhr = null;
    };
    if (cancelToken) {
      cancelToken.promise.then((msg) => {
        xhr!.abort();
        reject(new Error(msg.message));
      });
    }
    xhr.send();
  });
}
