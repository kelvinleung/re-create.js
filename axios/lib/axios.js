import Axios from "./core/Axios";
import defaults from "./defaults";

function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  const instance = Axios.prototype.request.bind(context);
  return instance;
}

const axios = createInstance(defaults);

export default axios;
