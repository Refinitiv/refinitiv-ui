<!-- 
title: Local caching Utility
location: ./utils/cache
type: page
layout: default
-->

::status-todo::

# Local cache
The utility provides provides an alternative way to store data on your local machine.
There are 2 main classes that collaborate for wrapper and real storage. LocalCache is high level class that wraps the selected storage to be asynchronous api.
The second is storage class which has a list of support as below:
- localstorage
- indexeddb

LocalCache can select only one storage to use. Here is a common use.

```typescript
import { CacheIndexedDBStorage, CacheLocalStorage, LocalCache } from '@refinitiv-ui/utils/cache.js';
// Create storage
const localStorage = new CacheLocalStorage('my-cache-');
const dbStorage = new CacheIndexedDBStorage({ dbName: 'my-database', version: 1, storeName: 'my-store' });
// Create cache and use the storage
const cache = new LocalCache(dbStorage);
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
const cache = new LocalCache();

// store 'my-item-01': { label: '01', value: 1} to LocalCache. Default cache expiry is 5 days
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

#### Returns

| Type | Description |
| --- | --- |
| String | The new value with the months added |

### get
Returns cache data value based on provided key

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
const key = 'my-item-01';
const cache = new LocalCache();

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
const cache = new LocalCache();

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
Remove related items in the storage

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
const cache = new LocalCache();

// remove specific item follow by the key 'my-item-01'
await cache.clear();
```

#### Syntax

```text
cache.clear();
```

