import React, { useEffect } from "react";
import { useRef } from "react";

// view constants
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 400;
const CELL_SIZE = 20;

// update loop constants
const FPS = 60;
const UPDATE_INTERVAL_MS = 1000 / FPS;
const DROP_INTERVAL_MS = 1000; // drop 1 cell every DROP_INTERVAL_MS millisecond

enum InputKey {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Space = ' ',
}

type Input = {
  keyPressed: InputKey | null;
}

type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
type CellState = TetrominoType | null;
const TetrominoColors: Record<TetrominoType, string> = {
  'I': 'lightblue',
  'J': 'blue',
  'L': 'orange',
  'O': 'yellow',
  'S': 'green',
  'T': 'purple',
  'Z': 'red'
}

type Position = {
  x: number;
  y: number;
}

type Board = {
  width: number;
  height: number;
  cells: CellState[][];
}

type Tetromino = {
  type: TetrominoType;
  position: Position;
  rotation: number;  // 0, 1, 2, or 3 (90 degree rotations)
}

type GameState = {
  input: Input;
  board: Board;
  currentTetromino: Tetromino;
  nextTetromino: Tetromino;
  dropAccumulatorMs: number,
  lastDropTimeMs: number,
}

// utils
// TODO: move these into their own file
const getCurrentTimeMs = () => performance.now();

const setupInputHandlers = (state: GameState) => {
  window.addEventListener('keydown', (e) => {
    // e.preventDefault();
    if (Object.values(InputKey).includes(e.key as InputKey)) {
      state.input.keyPressed = e.key as InputKey;
    }
  });
}

const update = (ctx: CanvasRenderingContext2D, state: GameState) => {
  // TODO: update game based on input state
  // Example: if (state.input.keys.has('ArrowLeft')) { ... }

  // TODO refactor getTetrominoPositions, Tetromino type to provide
  // a boardX and boardY out of the box. or a util method to
  // take the baord-centric view of a tetromino (give absolute board position)
  const commitTetrominoToBoard = () => {
    // assumes current tetromino is within board bounds. otherwise runtime errors
    const cellOffsets = getTetrominoPositions(state.currentTetromino);
    cellOffsets.forEach((offset: Position) => {
      const boardX = state.currentTetromino.position.x + offset.x;
      const boardY = state.currentTetromino.position.y + offset.y;
      state.board.cells[boardY][boardX] = state.currentTetromino.type;
    });

    // Spawn new piece
    state.currentTetromino = {
      type: getRandomTetromino(),
      position: { x: 4, y: 0 },
      rotation: 0,
    };
    // TODO spawn next piece
  }

  // returns true if tetromino with corner at (x, y) collides with either another tetromino
  // or the board boundaries vertically
  // collides and can move no further
  const collides = (x: number, y: number) => {
    // getTetrominoPositions(state.currentTetromino.type).forEach((offset) => {
    const positions = getTetrominoPositions(state.currentTetromino);
    for (let i = 0; i < positions.length; ++i) {
      const offset: Position = positions[i];
      const boardX = x + offset.x;
      const boardY = y + offset.y;

      // vertical boundary check
      if (boardY < 0 || boardY >= state.board.height) {
        return true;
      }

      // tetromino check
      if (state.board.cells[boardY][boardX] !== null) {
        return true;
      }
    };
    return false;
  }

  // update tetromino position
  let newX = state.currentTetromino.position.x;
  let newY = state.currentTetromino.position.y;

  // automatically drop piece
  if (state.dropAccumulatorMs >= DROP_INTERVAL_MS) {
    ++newY;
    state.dropAccumulatorMs -= DROP_INTERVAL_MS;
  }

  // attempt a move from user input
  switch (state.input.keyPressed) {
    case InputKey.ArrowLeft:
      if (!collides(newX - 1, newY)) {
        --newX;
      }
      break;
    case InputKey.ArrowRight:
      if (!collides(newX + 1, newY)) {
        ++newX;
      }
      break;
    case InputKey.ArrowDown:
      if (!collides(newX, newY + 1)) {
        ++newY;
      }
      break;
    case InputKey.ArrowUp:
      state.currentTetromino.rotation = (state.currentTetromino.rotation + 1) % 4;
      break;
    case InputKey.Space:
      console.log("handling space key");
      while (!collides(newX, newY + 1)) {
        ++newY;
      }
      break;
    default:
      break;
  }

  // check for collision with attempted move
  if (collides(newX, newY)) {
    // ignore newX and newY, because the piece can move no further
    commitTetrominoToBoard();
    state.dropAccumulatorMs = 0; // reset after landing
  } else {
    state.currentTetromino.position = {
      x: newX,
      y: newY
    };
  }

  // clear user input
  state.input.keyPressed = null;
}

// TODO move this out
// const getTetrominoPositions = (type: TetrominoType, rotation: number): Position[] => {


const render = (ctx: CanvasRenderingContext2D, state: GameState) => {
  const drawCell = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF'; // White border for cells
    ctx.lineWidth = 2; // Thicker border for visibility
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  };

  const drawTetromino = (tetromino: Tetromino) => {
    const color = TetrominoColors[tetromino.type];
    const occupiedCells = getTetrominoPositions(tetromino);

    occupiedCells.forEach((cell) => {
      // absolute board position for this tetromino
      const boardX = tetromino.position.x + cell.x;
      const boardY = tetromino.position.y + cell.y;
      drawCell(boardX, boardY, color);
    });
  }

  const drawBoard = (board: Board) => {
    ctx.fillStyle = '#808080';  // Medium gray
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    board.cells.forEach((row: CellState[], rowIndex: number) => {
      row.forEach((cellState: CellState, cellIndex: number) => {
        if (cellState) {
          ctx.fillStyle = TetrominoColors[cellState];
          ctx.strokeStyle = '#FFFFFF';
          ctx.fillRect(cellIndex * CELL_SIZE, rowIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          ctx.strokeRect(cellIndex * CELL_SIZE, rowIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      });
    });
  }
  drawBoard(state.board);
  drawTetromino(state.currentTetromino);
}

const getRandomTetromino = (): TetrominoType => {
  const tetrominoTypes: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  return tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
}

const initGameState = (): GameState => {
  const boardWidth = CANVAS_WIDTH / CELL_SIZE;
  const boardHeight = CANVAS_HEIGHT / CELL_SIZE;

  return {
    input: {
      keyPressed: null,
    },
    board: {
      width: boardWidth,
      height: boardHeight,
      cells: Array(boardHeight).fill(null).map(() => Array(boardWidth).fill(null)), // Initialize empty board
    },
    currentTetromino: {
      type: getRandomTetromino(),
      position: { x: 4, y: 0 },  // Start near the top center
      rotation: 0,
    },
    nextTetromino: {
      type: getRandomTetromino(),
      position: { x: 4, y: 0 },
      rotation: 0,
    },
    dropAccumulatorMs: 0,
    lastDropTimeMs: getCurrentTimeMs(),
  };
};

const GameLoop = (ctx: CanvasRenderingContext2D, state: GameState) => {
  let previousTime: number = getCurrentTimeMs();
  // let lag: number = 0;

  const loop = () => {
    const currentTime: number = getCurrentTimeMs();
    const elapsedTime: number = currentTime - previousTime;
    previousTime = currentTime;

    // TODO account for lag in the browser repaint loop?
    if (elapsedTime >= UPDATE_INTERVAL_MS) {
      state.dropAccumulatorMs += elapsedTime;
      update(ctx, state);
      render(ctx, state);
    }
    
    requestAnimationFrame(loop); // Re-update before next browser repaint step
  };

  loop();
}

const InitGame = (ctx: CanvasRenderingContext2D) => {
  // Set up game state
  const state: GameState = initGameState();

  // Set up input handlers
  setupInputHandlers(state);

  return state;
}

export const Game: React.FC = () => {
  // Upper left corner: (0, 0)
  // Lower right corner: (CANVAS_WIDTH, CANVAS_HEIGHT)
  //  __ x
  // |
  // y
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize and run game, only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state: GameState = InitGame(ctx);

    GameLoop(ctx, state);
  }, []);

  return (
    <canvas ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT} />
  )
}