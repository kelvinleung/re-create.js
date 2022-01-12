export default function mergeConfig(config1, config2) {
  return { ...config1, ...config2 };
}
