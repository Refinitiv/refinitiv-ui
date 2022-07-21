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

A common use case for the utility is to provide navigation over the HTML table.

::
```css
.table {
  display: table;
  border-spacing: 1px;
}

.row {
  display: table-row;
}

.cell {
  font-size: 16px;
  display: table-cell;
  width: 3em;
  height: 3em;
  text-align: center;
  vertical-align: middle;
  outline: none;
  background-color: #A01C2B;
  cursor: pointer;
}

.cell[tabindex] {
  background-color: #227542;
}

.cell:focus {
  background-color: #334BFF;
}
```
```html
<div id="grid" class="table">
  <div class="row">
    <div class="cell" tabindex="0">1</div>
    <div class="cell">0</div>
    <div class="cell" tabindex="0">1</div>
    <div class="cell">0</div>
  </div>
  <div class="row">
    <div class="cell" tabindex="0">1</div>
    <div class="cell" tabindex="0">1</div>
    <div class="cell" tabindex="0">1</div>
    <div class="cell" tabindex="0">1</div>
  </div>
  <div class="row">
    <div class="cell" tabindex="0">1</div>
    <div class="cell" tabindex="0">1</div>
    <div class="cell">0</div>
    <div class="cell" tabindex="0">1</div>
  </div>
  <div class="row">
    <div class="cell">0</div>
    <div class="cell" tabindex="0">1</div>
    <div class="cell" tabindex="0">1</div>
    <div class="cell" tabindex="0">1</div>
  </div>
</div>
```
```javascript
import { halo } from '/theme-loader.js';
import { first, last, left, right, up, down } from 'https://cdn.skypack.dev/@refinitiv-ui/utils/navigation.js?min';
halo();

const gridElement = document.getElementById('grid');

/**
 * Get a list of HTML elements in a grid form
 * @return {[HTMLElement[]]} a collection of HTML elements grouped in rows
 */
const getGridHTML = () => {
  const grid = [];
  for (let i = 0; i < gridElement.children.length; i += 1) {
    const row = [];
    const rowElement = gridElement.children[i];
    for (let e = 0; e < rowElement.children.length; e += 1) {
      row.push(rowElement.children[e]);
    }
    grid.push(row);
  }
  return grid;
};

/**
 * Get grid matrix
 * @return {(number)[][]} Grid matrix
 */
const getGridMatrix = () => getGridHTML().map(row => row.map(cell => cell.tabIndex >= 0 ? 1 : 0));

/**
 * Get active cell index
 * @return {null|[number, number]} Cell index
 */
const getActiveCell = () => {
  const gridHTML = getGridHTML();

  for (let rowIdx = 0; rowIdx < gridHTML.length; rowIdx += 1) {
    const columnIdx = gridHTML[rowIdx].findIndex(cellElement => document.activeElement === cellElement);
    if (columnIdx !== -1) {
      return [columnIdx, rowIdx];
    }
  }
  return null;
};

/**
 * Focus on active cell
 * @param {null|[number, number]} index Cell index
 */
const setActiveCell = (index) => {
  if (!index) {
    return;
  }
  const row = getGridHTML()[index[1]];
  if (!row) {
    return;
  }

  const cellElement = row.find((cellElement, columnIdx) => index[0] === columnIdx);
  cellElement && cellElement.focus();
};

/**
 * Navigate to the cell based on provided key
 * @param {'ArrowUp'|'ArrowDown'|'ArrowLeft'|'ArrowRight'|'Home'|'End'} key The direction key
 */
const onNavigate = (key) => {
  let activeCell = getActiveCell();
  const matrix = getGridMatrix();

  if (!activeCell) {
    setActiveCell(first(matrix));
    return;
  }

  switch (key) {
    case 'ArrowUp':
      activeCell = up(matrix, activeCell);
      break;
    case 'ArrowDown':
      activeCell = down(matrix, activeCell);
      break;
    case 'ArrowLeft':
      activeCell = left(matrix, activeCell);
      break;
    case 'ArrowRight':
      activeCell = right(matrix, activeCell);
      break;
    case 'Home':
      activeCell = first(matrix);
      break;
    case 'End':
      activeCell = last(matrix);
      break;
    // no default
  }

  setActiveCell(activeCell);
};

gridElement.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'Home':
    case 'End':
      onNavigate(event.key);
      event.preventDefault();
      break;
    // no default
  }
});
```
::

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
