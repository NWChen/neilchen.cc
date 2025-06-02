import { Tetromino, Position, TetrominoType } from "./state";

// Returns an array of Position representing the locations in a 4x4 grid of a tetromino with the given type and rotation
const getTetrominoGeometry = (type: TetrominoType, rotation: number): Position[] => {
  const geometries = {
    'T': {
      0: [[0, 1], [1, 0], [1, 1], [1, 2]],
      1: [[0, 1], [1, 0], [1, 1], [2, 1]],
      2: [[1, 0], [1, 1], [1, 2], [2, 1]],
      3: [[0, 1], [1, 1], [1, 2], [2, 1]],
    },
    'I': {
      0: [[0, 0], [0, 1], [0, 2], [0, 3]],
      1: [[0, 2], [1, 2], [2, 2], [3, 2]],
      2: [[0, 0], [0, 1], [0, 2], [0, 3]],
      3: [[0, 2], [1, 2], [2, 2], [3, 2]],
    },
    'L': {
      0: [[0, 1], [1, 1], [2, 1], [2, 2]],
      1: [[0, 0], [1, 0], [1, 1], [1, 2]],
      2: [[0, 0], [0, 1], [1, 1], [2, 1]],
      3: [[1, 0], [1, 1], [1, 2], [2, 2]],
    },
    'J': {
      0: [[0, 1], [1, 1], [2, 1], [2, 0]],
      1: [[0, 0], [1, 0], [1, 1], [1, 2]],
      2: [[0, 1], [0, 2], [1, 1], [2, 1]],
      3: [[1, 0], [1, 1], [1, 2], [0, 2]],
    },
    'O': {
      0: [[0, 0], [0, 1], [1, 0], [1, 1]],
      1: [[0, 0], [0, 1], [1, 0], [1, 1]],
      2: [[0, 0], [0, 1], [1, 0], [1, 1]],
      3: [[0, 0], [0, 1], [1, 0], [1, 1]],
    },
    'S': {
      0: [[0, 1], [0, 2], [1, 0], [1, 1]],
      1: [[0, 0], [1, 0], [1, 1], [2, 1]],
      2: [[0, 1], [0, 2], [1, 0], [1, 1]],
      3: [[0, 0], [1, 0], [1, 1], [2, 1]],
    },
    'Z': {
      0: [[0, 0], [0, 1], [1, 1], [1, 2]],
      1: [[0, 1], [1, 0], [1, 1], [2, 0]],
      2: [[0, 0], [0, 1], [1, 1], [1, 2]],
      3: [[0, 1], [1, 0], [1, 1], [2, 0]],
    }
  }[type][rotation];

  return geometries.map(([x, y]) => ({
    x, y
  }));
}

const getRandomTetromino = (): TetrominoType => {
  const tetrominoTypes: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  return tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
}

// Transform a tetromino geometry in a 4x4 reference grid to absolute position (in actual grid).
const toGridGeometry = (tetrominoPosition: Position, tetrominoGeometry: Position[]): Position[] =>
  tetrominoGeometry.map(({ x, y }) => ({ x: tetrominoPosition.x + x, y: tetrominoPosition.y + y }));

// Spawn a new tetromino at the given position. 
export const initTetromino = (position: Position): Tetromino => {
  const type: TetrominoType = getRandomTetromino();
  const rotation = 0;
  return {
    type,
    position,
    rotation,
    geometry: getTetrominoGeometry(type, rotation)
  };
};