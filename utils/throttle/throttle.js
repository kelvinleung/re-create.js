// 第一次会立即触发，结束后不会多触发，但结束后超过 delay 再开始，又会立即触发
export function throttleWithTimestamp(fn, delay) {
  let lastTime = 0;
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(context, args);
      lastTime = now;
    }
  };
}

// 第一次会延时触发，结束后会触发多一次
export function throttleWithTimer(fn, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

// 组合
export function throttle(fn, delay) {
  let timer,
    lastTime = 0;
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    // 没有剩余时间或更改了当前时间，马上执行
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(context, args);
    } else if (!timer) {
      // 否则推迟执行（到剩余时间）
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  };
}
