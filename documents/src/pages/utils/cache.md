<!-- 
title: Local caching Utility
location: ./utils/cache
type: page
layout: default
-->

::status-complete::

# Local cache

The utility provides an alternative way to store data locally in browser.
LocalCache is high level class that wraps the selected storage to be asynchronous api. The class requires a string as a name of the cache. And storage options can be set as config. The storages has a list of support as below:

- localstorage : simple and fast, but 5MB limit at one site
- indexeddb : low-level storage, store size up to 2GB

LocalCache defines localstorage by default. Here is a common use.

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
// Create cache and use the storage
const cache = new LocalCache(
  'my-cache', // name of the cache
  { storage: 'indexeddb' } // config with storage type
);
// Example using an api
await cache.set(key, data);
const item = await cache.get(key);
```

## LocalCache APIs

### set

Caches a value against a key to use until expired

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
const key = 'my-item-01';
const value = { label: '01', value: 1};
// Create cache and use the storage
const cache = new LocalCache('my-cache', { storage: 'indexeddb' });
// store 'my-item-01': { label: '01', value: 1} to `indexeddb`.
await cache.set(key, value);
```

#### Syntax

```text
cache.set(key, value, expires);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| key | String | Cache key |
| value | unknown | Data to store in cache |
| expires | Number | Cache expiry in seconds. Defaults to 5 days. |

### get

Returns cache data value based on provided key

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
const key = 'my-item-01';
// Create cache and use the storage
const cache = new LocalCache('my-cache', { storage: 'indexeddb' });

// get specific item follow by the key 'my-item-01', or got null if the key isn't cached
await cache.get(key); // => { label: '01', value: 1}
```

#### Syntax

```text
cache.get(key);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| key | String | Cache key |

#### Returns

| Type | Description |
| --- | --- |
| String \| null | string data or `null` if the key isn't cached |

### remove

Remove cache data value based on provided key

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
const key = 'my-item-01';
// Create cache and use the storage
const cache = new LocalCache('my-cache', { storage: 'indexeddb' });
// remove specific item follow by the key 'my-item-01'
await cache.remove(key);
```

#### Syntax

```text
cache.remove(key);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| key | String | Cache key |

### clear

Clears all items from cache

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
// Create cache and use the storage
const cache = new LocalCache('my-cache', { storage: 'indexeddb' });
// remove all items in the cache
await cache.clear();
```

#### Syntax

```text
cache.clear();
```

