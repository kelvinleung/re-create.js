import Cancel from "../cancel/Cancel";
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
        reject(new Error(`${xhr.status}`));
      }
      xhr = null;
    };
    xhr.onabort = function handleAbort() {
      if (!xhr) {
        return;
      }
      console.log("abort");
      reject(new Error("Request aborted"));
      xhr = null;
    };
    if (cancelToken) {
      cancelToken.promise.then((msg) => {
        reject(new Cancel(msg.message));
        xhr!.abort();
      });
    }
    xhr.send();
  });
}
