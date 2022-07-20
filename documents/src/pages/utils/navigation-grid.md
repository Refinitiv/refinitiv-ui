<!-- 
title: Navigation Grid
location: ./utils/navigation-grid
type: page
layout: default
-->

::status-complete::

# Navigation Grid

The utility provides a convenient way to navigate over a grid matrix.

The grid contains of rows with cells that can be active (`1`) or inactive (`0`). A cell is referenced by _column index_ and _row index_, e.g. `[0, 0]` for first column and first row; `[2, 3]` for third column and fourth row.

```typescript
import { first, right, down } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

// Get the first cell
let cell = first(grid); // => [0, 0], first column and first row

// Get an active cell on the right of the first cell
cell = right(grid, cell); // => [2, 0], third column and first row

// Get the cell below the third column and first row
cell = down(grid, cell); // => [2, 1], third column and second row
```

## Common Helpers

### down

Navigate _down_ from the cell to find the closest active cell on the following rows.

```typescript
import { down } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

down(grid, [0, 0]); // => [0, 1]
down(grid, [2, 1]); // => [1, 2]
down(grid, [1, 3]); // => null
```

#### Syntax

```text
down(grid, cell);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| grid | NavigationGrid | The navigation grid |
| cell | CellIndex | The cell index |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The closest active cell index on the following rows |

### first

Get the first active cell.

```typescript
import { first } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

first(grid); // => [0, 0]
```

#### Syntax

```text
first(grid);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| grid | NavigationGrid | The navigation grid |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The first active cell index |

### last

Get the last active cell.

```typescript
import { last } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

last(grid); // => [3, 3]
```

#### Syntax

```text
last(grid);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| grid | NavigationGrid | The navigation grid |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The last active cell index |

### left

Navigate _left_ from the cell. If there is no active cell on the _left_, then iterate over preceding rows to find one.

```typescript
import { left } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

left(grid, [1, 2]); // => [0, 2]
left(grid, [0, 1]); // => [2, 0]
left(grid, [0, 0]); // => null
```

#### Syntax

```text
left(grid, cell);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| grid | NavigationGrid | The navigation grid |
| cell | CellIndex | The cell index |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The previous active cell index |

### right

Navigate _right_ from the cell. If there is no active cell on the _right_, then iterate over following rows to find one.

```typescript
import { right } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

right(grid, [1, 2]); // => [3, 2]
right(grid, [3, 2]); // => [1, 3]
right(grid, [3, 3]); // => null
```

#### Syntax

```text
right(grid, cell);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| grid | NavigationGrid | The navigation grid |
| cell | CellIndex | The cell index |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The next active cell index |

### up

Navigate _up_ from the cell to find the closest active cell on the preceding rows.

```typescript
import { up } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

up(grid, [1, 2]); // => [1, 1]
up(grid, [1, 1]); // => [2, 0]
up(grid, [0, 0]); // => null
```

#### Syntax

```text
up(grid, cell);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| grid | NavigationGrid | The navigation grid |
| cell | CellIndex | The cell index |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The closest active cell index on the preceding rows |

## Types

The list of _TypeScript_ types.

| Name | Description | Value |
| --- | --- | --- |
| CellIndex | Cell index as `[Column Index, Row Index]`. _index_ is 0-based. | `[number, number]` |
| NavigationGrid | A list of `NavigationRow` | `NavigationRow[]` |
| NavigationRow | A list of _0_ and _1_. _0_ is an inactive cell, but _1_ is active. | `(0 &#124; 1)[]` |
