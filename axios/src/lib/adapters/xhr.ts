import { AxiosRequestConfig, ResponsePromise } from "../types";

export default function xhrAdapter(
  config: AxiosRequestConfig
): ResponsePromise {
  return new Promise((resolve, reject) => {
    const { method, url, cancelToken } = config;
    let xhr: XMLHttpRequest | null = new XMLHttpRequest();
    xhr.open(method!.toUpperCase(), url!);
    xhr.onreadystatechange = function handleLoad() {
      if (!xhr || xhr.readyState !== 4) {
        return;
      }
      const response = {
        data: xhr.response,
        status: xhr.status,
        statusText: xhr.statusText,
        config,
      };
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(response);
      } else {
        reject(new Error("出错了"));
      }
      xhr = null;
    };
    xhr.onabort = function handleAbort() {
      // 这里是非“手动”触发的取消，浏览器行为
      if (!xhr) {
        return;
      }
      reject(new Error("Request aborted"));
      xhr = null;
    };
    if (cancelToken) {
      cancelToken.promise.then((cancel) => {
        // 要先 reject 再 abort，先 abort 会导致 readystate 变为 4，status 为 0，走 onreadystatechange 的逻辑
        reject(cancel);
        xhr!.abort();
        xhr = null;
      });
    }
    xhr.send();
  });
}
