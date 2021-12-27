export default function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(config.method.toUpperCase(), config.url);
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status >= 200 && request.status < 300) {
        resolve(request.response);
      } else {
        reject(request.status);
      }
    };
    request.send();
  });
}
