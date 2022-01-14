import { AxiosRequestConfig } from "../types";

export default function mergeConfig(
  to: AxiosRequestConfig,
  from: object
): AxiosRequestConfig {
  return { ...to, ...from };
}
