<!-- 
title: Navigation Grid
location: ./utils/navigation-grid
type: page
layout: default
-->

::status-complete::

# Navigation Grid

The utility provides a convenient way to navigate over a grid matrix.

The grid contains of rows with cells that can be active (`1`) or inactive (`0`). A cell is referenced by _column index_ and _row index_, e.g. `0 0` for first column and first row; `2 3` for third column and fourth row.

```text
1 0 1 0
1 1 1 1
1 1 0 1
0 1 1 1
```

```typescript
import { first, right, down } from '@refinitiv-ui/utils/navigation.js';

const grid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

// Get the first cell, which is on first column and first row
let cell = first(grid); // => [0, 0]

// Get an active cell on the right of the first cell, which is on third column and first row
cell = right(grid, cell); // => [2, 0]

// Get the cell below the third column and first row, which is on third column and second row
cell = down(grid, cell); // => [2, 1]
```

## Common Helpers

### down

Navigate down from the start cell trying to find the closest cell on the following rows.

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
| cell | CellIndex | The start cell |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The closest active cell on the next row |

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
| CellIndex &#124; null | The first active cell |

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
| CellIndex &#124; null | The last active cell |

### left

Navigate left from the start cell. If there is no active cell on the left, then iterate over preceding rows to find one.

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
| cell | CellIndex | The start cell |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The previous active cell |

### right

Navigate right from the start cell. If there is no active cell on the right, then iterate over following rows to find one.

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
| cell | CellIndex | The start cell |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The next active cell |

### up

Navigate up from the start cell trying to find the closest cell on the preceding rows.

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
| cell | CellIndex | The start cell |

#### Returns

| Type | Description |
| --- | --- |
| CellIndex &#124; null | The closest active cell on the preceding row |

## Types

The list of _TypeScript_ types.

| Name | Description | Value |
| --- | --- | --- |
| CellIndex | The first number is _column index_ and the second is _row index_. _index_ is 0-based. | `[number, number]` |
| NavigationGrid | A list of `NavigationRow` | `NavigationRow[]` |
| NavigationRow | A list of _0_ and _1_. _0_ is an inactive cell, but _1_ is active. | `(0 &#124; 1)[]` |
