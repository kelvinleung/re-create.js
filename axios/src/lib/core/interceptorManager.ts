import { FulfilledFn, Interceptor, RejectedFn } from "../types";

export default class InterceptorManager<T> {
  handlers: Array<Interceptor<T> | null>;
  constructor() {
    this.handlers = [];
  }

  use(fulfilled: FulfilledFn<T>, rejected?: RejectedFn): number {
    this.handlers.push({
      fulfilled,
      rejected,
    });
    // 下标作为 id，用于 eject
    return this.handlers.length - 1;
  }

  eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.handlers.forEach((interceptor) => {
      if (interceptor) {
        fn(interceptor);
      }
    });
  }
}
