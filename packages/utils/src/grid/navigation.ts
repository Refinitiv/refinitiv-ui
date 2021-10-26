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
 * Cell, where first number is row index and second number is column index
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
    const nextIndex = target + (i * direction);
    if (row[nextIndex]) {
      return [rowIndex, nextIndex];
    }
    const prevIndex = target - (i * direction);
    if (row[prevIndex]) {
      return [rowIndex, prevIndex];
    }
  }

  return null;
};

/**
 * Get the previous active cell
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Previous cell. If none return null
 */
const previousCell = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  let [rowIndex, columnIndex] = cell;
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
      return [rowIndex, columnIndex];
    }
  }

  return null;
};

/**
 * Get the next active cell
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Next cell. If none return null
 */
const nextCell = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  let [rowIndex, columnIndex] = cell;
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
      return [rowIndex, columnIndex];
    }
  }

  return null;
};

/**
 * Get the closest active cell on the previous row
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Closest cell on the previous row. If none return null
 */
const previousRowCell = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  let rowIndex = cell[0];
  const columnIndex = cell[1];

  while ((rowIndex -= 1) >= 0) {
    const cell = closest(grid, rowIndex, columnIndex, 1);
    if (cell) {
      return cell;
    }
  }

  return null;
};

/**
 * Get the closest active cell on the next row
 * @param grid Navigation grid
 * @param cell Start cell
 * @returns cell Closest cell on the next row. If none return null
 */
const nextRowCell = (grid: NavigationGrid, cell: CellIndex): CellIndex | null => {
  let rowIndex = cell[0];
  const columnIndex = cell[1];
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
const firstCell = (grid: NavigationGrid): CellIndex | null => nextCell(grid, [0, -1]);

/**
 * Get the last active cell
 * @param grid Navigation grid
 * @returns cell The last active cell. If none return null
 */
const lastCell = (grid: NavigationGrid): CellIndex | null => {
  const [rowCount, columnCount] = counts(grid);
  return previousCell(grid, [rowCount - 1, columnCount]);
};

export {
  NavigationRow,
  NavigationGrid,
  CellIndex,
  nextCell,
  previousCell,
  nextRowCell,
  previousRowCell,
  firstCell,
  lastCell
};
