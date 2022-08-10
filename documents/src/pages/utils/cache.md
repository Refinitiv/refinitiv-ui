<!-- 
title: Local caching Utility
location: ./utils/cache
type: page
layout: default
-->

::status-complete::

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
const storeLocalStorage = new CacheLocalStorage('my-cache-');
const dbStorage = new CacheIndexedDBStorage({ dbName: 'my-database', version: 1, storeName: 'my-store' });
// Create cache and use the storage
const cache = new LocalCache(dbStorage);
// Example using an api
await cache.set(key, data);
const item = await cache.get(key);
```

## Storages

### CacheLocalStorage
A class wraps `localStorage` that allow to save storage by key/value. It requires prefix as a string to separate data from being related with other data.

```typescript
import { CacheLocalStorage } from '@refinitiv-ui/utils/cache.js';
// Create storage
const storeLocalStorage = new CacheLocalStorage('my-cache-'); // my-cache- is prefix
```

```text
const storeLocalStorage = new CacheLocalStorage(prefix);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| prefix | String | prefix string to categorize our own |

#### Returns

| Type | Description |
| --- | --- |
| CacheLocalStorage | A class wraps localStorage |

### CacheIndexedDBStorage
A class wraps `indexeddb` that allow to create local database with store. It requires database name, version, and store name pack together for create a database.

```typescript
import { CacheIndexedDBStorage } from '@refinitiv-ui/utils/cache.js';
import type { CacheIndexedDBStorageConfig } from '@refinitiv-ui/utils/cache.js';
const config = {
  dbName: 'my-database',
  version: 1,
  storeName: 'my-store'
} as CacheIndexedDBStorageConfig;
// Create storage
const dbStorage = new CacheIndexedDBStorage(config);
```

```text
const dbStorage = new CacheIndexedDBStorage({ dbName, version, storeName });
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| config | CacheIndexedDBStorageConfig | A config that contains dbName, version, and storeName. dbName is a String represents database name. version is a number represents database version. storeName is a string represents store name |

#### Returns

| Type | Description |
| --- | --- |
| CacheIndexedDBStorage | A class wraps indexeddb |

## LocalCache APIs

### set
Caches a value against a key to use until expired

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
const key = 'my-item-01';
const value = { label: '01', value: 1};
// Create storage
const dbStorage = new CacheIndexedDBStorage({ dbName: 'my-database', version: 1, storeName: 'my-store' });
// Create cache and use the storage
const cache = new LocalCache(dbStorage);

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

### get
Returns cache data value based on provided key

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';
const key = 'my-item-01';
// Create storage
const dbStorage = new CacheIndexedDBStorage({ dbName: 'my-database', version: 1, storeName: 'my-store' });
// Create cache and use the storage
const cache = new LocalCache(dbStorage);

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
// Create storage
const dbStorage = new CacheIndexedDBStorage({ dbName: 'my-database', version: 1, storeName: 'my-store' });
// Create cache and use the storage
const cache = new LocalCache(dbStorage);

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
// Create storage
const dbStorage = new CacheIndexedDBStorage({ dbName: 'my-database', version: 1, storeName: 'my-store' });
// Create cache and use the storage
const cache = new LocalCache(dbStorage);

// remove specific item follow by the key 'my-item-01'
await cache.clear();
```

#### Syntax

```text
cache.clear();
```

