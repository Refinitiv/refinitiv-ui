<!-- 
title: Navigation Grid
location: ./utils/navigation-grid
type: page
layout: default
-->



# Navigation Grid

The utility provides a convenient way to navigate over a grid matrix.

The grid contains of rows with cells that can be active (`1`) or inactive (`0`). A cell is referenced by _column index_ and _row index_, e.g. `[0, 0]` for first column and first row; `[2, 3]` for third column and fourth row.

```typescript
import { NavigationGrid, CellIndex, first, right, down } from '@refinitiv-ui/utils/navigation.js';

const grid: NavigationGrid = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
];

// Get the first cell
let cell = first(grid) as CellIndex; // => [0, 0], first column and first row

// Get an active cell on the right of the first cell
right(grid, cell); // => [2, 0], third column and first row

// Get the cell below the third column and first row
down(grid, cell); // => [0, 1], first column and second row
```

A common use case for the utility is to provide navigation over the HTML table.

Click on the table and use _Arrow_, _Home_ and _End_ keys to select cells.

::
```html
<efx-navigation-grid></efx-navigation-grid>
```

```javascript
import { halo } from '/theme-loader.js';
import { BasicElement, html, css } from 'https://cdn.skypack.dev/@refinitiv-ui/core?min';
import { customElement } from 'https://cdn.skypack.dev/@refinitiv-ui/core/decorators/custom-element.js?min';
import { ifDefined } from 'https://cdn.skypack.dev/@refinitiv-ui/core/directives/if-defined.js?min';
import { first, last, left, right, up, down } from 'https://cdn.skypack.dev/@refinitiv-ui/utils/navigation.js?min';
halo();

// Number of rows and columns to generate random sample matrix
const Rows = 4;
const Columns = 4;
const Matrix = Array.from(Array(Rows)).map(
  () => Array.from(Array(Columns)).map(
    () => Math.round(Math.random())));

/**
 * Navigation Grid Test Example
 */
class NavigationGrid extends BasicElement {
  static properties = {
    matrix: {
      type: Array,
      attribute: false
    }
  };

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns {CSSResultGroup} CSS template
   */
  static styles = css`
    :host {
      display: contents;
      font-size: 16px;
      --active-cell-background-color: var(--color-scheme-positive);
      --inactive-cell-background-color: var(--color-scheme-negative);
      --focus-cell-background-color: var(--color-scheme-primary);
    }
    [part~=table] {
      display: table;
      border-spacing: 1px;
    }
    [part~=row] {
      display: table-row;
    }
    [part~=cell] {
      display: table-cell;
      width: 3em;
      height: 3em;
      text-align: center;
      vertical-align: middle;
      outline: none;
      background-color: var(--inactive-cell-background-color);
    }
    [part~=active] {
      cursor: pointer;
      background-color: var(--active-cell-background-color);
    }
    [part~=active]:focus {
      background-color: var(--focus-cell-background-color);
    }
  `;

  constructor() {
    super();
    this.matrix = Matrix;
  }

  /**
   * Get HTML grid
   * @returns {HTMLElement[][]} HTML grid
   */
  get gridHTML () {
    const rows = Array.from(this.renderRoot.querySelectorAll('[part~=row]'));
    return rows.map(row => Array.from(row.querySelectorAll('[part~=cell]')))
  }

  /**
   * Get active cell index
   * @returns {null|[number, number]} Cell index
   */
  get activeCell () {
    const activeElement = this.shadowRoot.activeElement;

    // document.activeElement.shadowRoot.activeElement
    const gridHTML = this.gridHTML;
    for (let rowIdx = 0; rowIdx < gridHTML.length; rowIdx += 1) {
      const columnIdx = gridHTML[rowIdx].indexOf(activeElement);
      if (columnIdx !== -1) {
        return [columnIdx, rowIdx];
      }
    }
    return null;
  }

  /**
   * Focus on active cell
   * @param {null|[number, number]} index Cell index
   */
  set activeCell (index) {
    if (!index) {
      return;
    }
    const row = this.gridHTML[index[1]];
    if (!row) {
      return;
    }
    const cellElement = row[index[0]];
    cellElement && cellElement.focus();
  }

  /**
   * Navigate to the cell based on provided key
   * @param {'ArrowUp'|'ArrowDown'|'ArrowLeft'|'ArrowRight'|'Home'|'End'} key The direction key
   * @returns {void}
   */
  onNavigate (key) {
    let activeCell = this.activeCell;
    if (!activeCell) {
      this.activeCell = first(this.matrix);
      return;
    }
    switch (key) {
      case 'ArrowUp':
        activeCell = up(this.matrix, activeCell);
        break;
      case 'ArrowDown':
        activeCell = down(this.matrix, activeCell);
        break;
      case 'ArrowLeft':
        activeCell = left(this.matrix, activeCell);
        break;
      case 'ArrowRight':
        activeCell = right(this.matrix, activeCell);
        break;
      case 'Home':
        activeCell = first(this.matrix);
        break;
      case 'End':
        activeCell = last(this.matrix);
        break;
      // no default
    }
    this.activeCell = activeCell;
  }

  /**
   * Run on keydown to bind Arrow keys
   * @param {KeyboardEvent} event Keyboard Event
   * @returns {void}
   */
  onKeyDown (event) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
        this.onNavigate(event.key);
        event.preventDefault();
        break;
      // no default
    }
  }

  /**
   * Get cell template
   * @param {0 | 1} active 0 if inactive cell, 1 if active
   * @returns {TemplateResult} Cell template
   */
  getCellTemplate (active) {
    return html`<div part="cell${active ? ' active' : ''}"
                     tabindex="${ifDefined(active ? 0 : undefined)}">${active ? 1 : 0}</div>`;
  }

  /**
   * Get row template
   * @param {(0 | 1)[]} row A list of 0 and 1 indicating a row of active cells
   * @returns {TemplateResult} Row template
   */
  getRowTemplate (row) {
    return html`<div part="row">${row.map(cell => this.getCellTemplate(cell))}</div>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns {TemplateResult} Render template
   */
  render () {
    return html`<div part="table"
                     @keydown="${this.onKeyDown}">${this.matrix.map(row => this.getRowTemplate(row))}</div>`;
  }
}
customElement('efx-navigation-grid', { theme: false })(NavigationGrid);
```
::

## Common Helpers

### down

Navigate _down_ from the cell to find the closest active cell on the following rows.

```typescript
import { NavigationGrid, down } from '@refinitiv-ui/utils/navigation.js';

const grid: NavigationGrid = [
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
import { NavigationGrid, first } from '@refinitiv-ui/utils/navigation.js';

const grid: NavigationGrid = [
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
import { NavigationGrid, last } from '@refinitiv-ui/utils/navigation.js';

const grid: NavigationGrid = [
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
import { NavigationGrid, left } from '@refinitiv-ui/utils/navigation.js';

const grid: NavigationGrid = [
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
import { NavigationGrid, right } from '@refinitiv-ui/utils/navigation.js';

const grid: NavigationGrid = [
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
import { NavigationGrid, up } from '@refinitiv-ui/utils/navigation.js';

const grid: NavigationGrid = [
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
| NavigationRow | A list of _0_ and _1_. _0_ is an inactive cell, but _1_ is active. | `(0 | 1)[]` |
