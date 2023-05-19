import { createContext } from '@lit-labs/context';

export type IconMap = {
  [key: string]: string,
}
export type ConfigIcon = {
  map: IconMap
}
export type Config = {
  icon?: ConfigIcon,
}
export const efConfig = createContext<Config>('ef-config');
