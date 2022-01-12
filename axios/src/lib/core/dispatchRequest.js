import defaults from "../defaults";

export default function dispatchRequest(config) {
  const adapter = config.adapter || defaults.adapter;
  return adapter(config).then(
    (response) => {
      return response;
    },
    (reason) => {
      return Promise.reject(reason);
    }
  );
}
