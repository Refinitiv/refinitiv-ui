<!-- 
title: Local caching Utility
location: ./utils/cache
type: page
layout: default
-->

::status-complete::

# Local cache

LocalCache utility provides an alternative way to store data locally in browser.

LocalCache is a high level asynchronous class that wraps the selected storage type. It requires cache database name and storage type in configuration object. There are 2 supported types of storages depending on your use case.

- `localstorage` : default storage option, fastest storage, but 5MB limit at one domain.
- `indexeddb` : store size up to 2GB.

Here is a common use.

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';

const cache = new LocalCache(
  'cache-name',
  { storage: 'indexeddb' }
);

await cache.set(key, data);
const item = await cache.get(key);
```

## LocalCache APIs

### set

Caches a value against a key until expired.  

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';

const cache = new LocalCache('my-cache', { storage: 'indexeddb' });

const key = 'my-item-01';
const value = { label: '01', value: 1};

// Stores 'my-item-01': { label: '01', value: 1} to `indexeddb`.
await cache.set(key, value);
```

#### Syntax

```text
cache.set(key, value, expires);
```

#### Arguments

| Name    | Type    | Description                                  |
| ------- | ------- | -------------------------------------------- |
| key     | String  | Cache key                                    |
| value   | unknown | Data to store in cache                       |
| expires | Number  | Cache expiry in seconds. Defaults to 5 days. |

### get

Returns cache data value based on provided key.

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';

const cache = new LocalCache('my-cache', { storage: 'indexeddb' });
await cache.get('my-item-01'); // => { label: '01', value: 1}
```

#### Syntax

```text
cache.get(key);
```

#### Arguments

| Name | Type   | Description |
| ---- | ------ | ----------- |
| key  | String | Cache key   |

#### Returns

| Type           | Description                                   |
| -------------- | --------------------------------------------- |
| String \| null | string data or `null` if the key isn't cached |

### remove

Remove cache data value based on provided key.

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';

const cache = new LocalCache('my-cache', { storage: 'indexeddb' });
await cache.remove('my-item-01');
```

#### Syntax

```text
cache.remove(key);
```

#### Arguments

| Name | Type   | Description |
| ---- | ------ | ----------- |
| key  | String | Cache key   |

### clear

Clears all items from cache.

```typescript
import { LocalCache } from '@refinitiv-ui/utils/cache.js';

const cache = new LocalCache('my-cache', { storage: 'indexeddb' });
await cache.clear();
```

#### Syntax

```text
cache.clear();
```
