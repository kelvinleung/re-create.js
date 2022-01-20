import { CancelExecutor } from "../types";
import Cancel from "./Cancel";

interface PromiseResolve {
  (reason: Cancel): void;
}

export default class CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  constructor(executor: CancelExecutor) {
    let resolvePromise: PromiseResolve;
    this.promise = new Promise<Cancel>((resolve) => {
      resolvePromise = resolve;
    });
    executor((message) => {
      if (this.reason) {
        return;
      }
      this.reason = new Cancel(message || "");
      resolvePromise(this.reason);
    });
  }
}
