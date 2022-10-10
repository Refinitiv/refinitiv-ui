/*
 * Default cache storage name prefix
 */
export enum DatabasePrefix {
  DEFAULT = 'ef'
}

export const CACHE_PREFIX = 'ef';
export const MESSENGER_PREFIX = 'ef';

/**
 * Interval to check the last message if does not have a new message in the interval
 */
export const MESSENGER_LAST_MESSAGE_INTERVAL = 3000;
