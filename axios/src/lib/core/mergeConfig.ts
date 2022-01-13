import { AxiosRequestConfig } from "../types";

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: object
): AxiosRequestConfig {
  return { ...config1, ...config2 };
}
