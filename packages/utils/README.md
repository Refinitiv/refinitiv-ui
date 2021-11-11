# Utilities for Element Framework

This package exposes modules for colors and asynchronous tasks.

<br>

## Color helper

Re-exports all functionalities from [d3-color](https://www.npmjs.com/package/d3-color).

## Async Tasks

Async tasks include **timeout**, **micro**, **animation** and **afterRender**.

Example:

```js
import {
  MicroTaskRunner, // Runs task as a MicroTask
  TimeoutTaskRunner, // Runs task inside of a timeout
  AnimationTaskRunner, // Runs task in an animation frame
  AfterRenderTaskRunner, // Runs task after render has finished
} from '@refinitiv-ui/utils';

const taskRunner = new MicroTaskRunner();

taskRunner.schedule(() => {
  // task to execute
});
```

`taskRunner.schedule()` can be called multiple times. Only the last callback will be executed.
This is to enable simplified code inside of elements, when multiple actions occur.

## Date Time Helper
Helper functions to support date and time manipulations.

## Navigation
Helper functions to support keyboard navigation.

### Grid Navigation
Helper functions to support navigation over the grid matrix.

For instance, consider the following matrix:

```text
0 0 1 1
1 1 0 1
1 0 1 1
1 1 0 1
```

where `1` is an active cell, but `0` is an inactive cell.

The matrix can be represented as a grid in an Array format:

```javascript
const grid = [[0, 0, 1, 1], [1, 1, 0, 1], [1, 0, 1, 1], [1, 1, 0, 1]];
```

The cell can be represented by zero-based `[columnIndex, rowIndex]`:

```javascript
const cell = [0, 3]; // first cell on the fourth row
```

The utility supports the following navigation methods:

#### left
Get an active cell when navigating to the left from the start cell.

```javascript
left(grid, [0, 1]); // Outputs [3, 0]
left(grid, [3, 1]); // Outputs [1, 1]
left(grid, [2, 0]); // Outputs null
```

#### right
Get an active cell when navigating to the right from the start cell.

```javascript
right(grid, [0, 1]); // Outputs [1, 1]
right(grid, [3, 1]); // Outputs [0, 2]
right(grid, [3, 3]); // Outputs null
```

#### up
Navigate up from the start cell trying to find the closest cell on the preceding rows.

```javascript
up(grid, [0, 1]); // Outputs [2, 0]
up(grid, [3, 1]); // Outputs [3, 0]
up(grid, [3, 0]); // Outputs null
```

#### down
Navigate down from the start cell trying to find the closest cell on the following rows.

```javascript
down(grid, [0, 1]); // Outputs [0, 2]
down(grid, [1, 1]); // Outputs [0, 2]
down(grid, [1, 3]); // Outputs null
```

#### first
Get the first active cell.

```javascript
first(grid); // Outputs [2, 0]
```

#### last
Get the last active cell.

```javascript
last(grid); // Outputs [3, 3]
```
