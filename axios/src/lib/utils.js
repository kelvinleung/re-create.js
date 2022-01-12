function extend(a, b, thisArg) {
  for (const key in b) {
    if (b.hasOwnProperty(key)) {
      if (thisArg && typeof b[key] === "function") {
        a[key] = b[key].bind(thisArg);
      } else {
        a[key] = b[key];
      }
    }
  }
  return a;
}

export default {
  extend,
};
