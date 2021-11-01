/**
 * Navigation Row, where 0 is inactive cell, but 1 is active, e.g.
 * 0 0 1 1
 */
type NavigationRow = (0 | 1)[];

/**
 * Navigation Grid, where 0 is inactive cell, but 1 is active, e.g.
 * 0 0 1 1
 * 1 1 0 1
 * 1 0 1 1
 * 1 1 0 1
 */
type NavigationGrid = NavigationRow[];

/**
 * Cell, where first number is column index and second number is row index.
 * Indexes are zero-based
 */
type CellIndex = [number, number];

/**
 * Get number of rows and columns in the grid
 * @param grid Navigation grid
 * @returns counts RowCount and ColumnCount
 */
const counts = (grid: NavigationGrid): [number, number] => [grid.length, grid.length ? grid[0].length : 0];

/**
 * Get the closest active cell for provided rowIndex and target
 * @param grid Navigation grid
 * @param rowIndex A row where to find the closest cell
 * @param target Target cell index
 * @param direction Get closest from the left (-1) or right (1)
 * @returns cell Closest cell. If none return null
 */
const closest = (grid: NavigationGrid, rowIndex: number, target: number, direction: -1 | 1): CellIndex | null => {
  const row = grid[rowIndex];
  if (!row) {
    return null;
  }

  for (let i = 0; i < row.length; i += 1) {
    const nextColumnIndex = target + (i * direction);
    if (row[nextColumnIndex]) {
      return [nextColumnIndex, rowIndex];
    }
    const prevColumnIndex = target - (i * direction);
    if (row[prevColumnIndex]) {
      return [prevColumnIndex, rowIndex];
    }
  }

  return null;
};

/**
 * Navigate left from the start cell.
 * If there is no active cell on the left,
 * than iterate over preceding rows to to find one
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Previous cell. If none return null
 */
const left = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  let [columnIndex, rowIndex] = cell;
  const columnCount = counts(grid)[1];

  while (rowIndex >= 0) {
    columnIndex -= 1;
    if (columnIndex < 0) {
      rowIndex -= 1;
      columnIndex = columnCount;
    }
    const row = grid[rowIndex];
    if (!row) {
      break;
    }
    const cell = row[columnIndex];
    if (cell) {
      return [columnIndex, rowIndex];
    }
  }

  return null;
};

/**
 * Navigate right from the start cell.
 * If there is no active cell on the right,
 * than iterate over following rows to to find one
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Next cell. If none return null
 */
const right = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  let [columnIndex, rowIndex] = cell;
  const [rowCount, columnCount] = counts(grid);

  while (rowIndex < rowCount) {
    columnIndex += 1;
    if (columnIndex >= columnCount) {
      rowIndex += 1;
      columnIndex = 0;
    }

    const row = grid[rowIndex];
    if (!row) {
      break;
    }
    const cell = row[columnIndex];
    if (cell) {
      return [columnIndex, rowIndex];
    }
  }

  return null;
};

/**
 * Navigate up from the start cell trying to
 * find the closest cell on the preceding rows
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Closest cell on the previous row. If none return null
 */
const up = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  const columnIndex = cell[0];
  let rowIndex = cell[1];

  while ((rowIndex -= 1) >= 0) {
    const cell = closest(grid, rowIndex, columnIndex, 1);
    if (cell) {
      return cell;
    }
  }

  return null;
};

/**
 * Navigate down from the start cell trying to
 * find the closest cell on the following rows
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Closest cell on the next row. If none return null
 */
const down = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  const columnIndex = cell[0];
  let rowIndex = cell[1];
  const [rowCount] = counts(grid);

  while ((rowIndex += 1) < rowCount) {
    const cell = closest(grid, rowIndex, columnIndex, -1);
    if (cell) {
      return cell;
    }
  }

  return null;
};

/**
 * Get the first active cell
 * @param grid Navigation grid
 * @returns cell The first active cell. If none return null
 */
const first = (grid: NavigationGrid): CellIndex | null => right(grid, [-1, 0]);

/**
 * Get the last active cell
 * @param grid Navigation grid
 * @returns cell The last active cell. If none return null
 */
const last = (grid: NavigationGrid): CellIndex | null => {
  const [rowCount, columnCount] = counts(grid);
  return left(grid, [columnCount, rowCount - 1]);
};

export {
  NavigationRow,
  NavigationGrid,
  CellIndex,
  right,
  left,
  down,
  up,
  first,
  last
};
