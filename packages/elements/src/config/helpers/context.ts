import { createContext } from '@lit-labs/context';

export type Icon = {
  [key: string]: string
}
export const efConfig = createContext<Icon>('ef-config');
