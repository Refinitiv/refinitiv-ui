import { CacheCore } from './cache-core.js';
export type { CacheConfig as LocalCacheConfig } from './cache-core.js';

/**
 * Cache utility that simplifies, unifies and enhances native browser storage.
 */
export class LocalCache extends CacheCore {}
