import { createContext } from '@lit-labs/context';
import type { Config } from './types.js';

export const DEFAULT_CONFIG: Config = { icon: { map: {} } };

export const efConfig = createContext<Config>('ef-configuration');
