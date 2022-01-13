function extend(to: any, from: any, thisArg?: any) {
  for (const key of Object.getOwnPropertyNames(from)) {
    if (thisArg && typeof to[key] === "function") {
      to[key] = from[key].bind(thisArg);
    } else {
      to[key] = from[key];
    }
  }
  return to;
}

export default {
  extend,
};
