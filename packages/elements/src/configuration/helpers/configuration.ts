import { type Config, type ConfigIcon } from '../helpers/context.js';

const DEFAULT_CONFIG: Config = { icon: { map: {} } };

type createConfig = {
  icon?: ConfigIcon,
}

export const createEfConfig = (config: createConfig = {}) => {
  return { ...DEFAULT_CONFIG, ...config };
};
