import { createContext } from '@lit-labs/context';

export type IconMap = {
  [key: string]: string,
}
export type Config = {
  icon: {
    map: IconMap
  }
}
export const efConfig = createContext<Config>('ef-config');
