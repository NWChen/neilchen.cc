// view constants
export const CANVAS_WIDTH = 200;
export const CANVAS_HEIGHT = 400;
export const CELL_SIZE = 20;

// update loop constants
export const FPS = 60;
export const UPDATE_INTERVAL_MS = 1000 / FPS;
export const DROP_INTERVAL_MS = 500; // drop 1 cell every DROP_INTERVAL_MS millisecond

export enum InputKey {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Space = ' ',
}

export type Input = {
  keyPressed: InputKey | null;
}

export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

// TODO refactor this
export const TetrominoColors: Record<TetrominoType, string> = {
  'I': 'lightblue',
  'J': 'blue',
  'L': 'orange',
  'O': 'yellow',
  'S': 'green',
  'T': 'purple',
  'Z': 'red'
}

export type Position = {
  x: number;
  y: number;
}

export type CellState = TetrominoType | null;
export type Grid = {
  width: number;
  height: number;
  cells: CellState[][];
}

export type Tetromino = {
  type: TetrominoType;
  position: Position;
  rotation: number;  // 0, 1, 2, or 3 (90 degree rotations)
  geometry: Position[]; // Occupied cells in a 4x4 grid, with x=0, y=0 at the upper left
}

export type GameState = {
  input: Input;
  grid: Grid;
  currentTetromino: Tetromino;
  nextTetromino: Tetromino;
  timeSinceLastDropMs: number, // Time since last drop
  // lastDropTimeMs: number,
}