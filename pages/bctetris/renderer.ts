import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE, CellState, GameState, Position, Tetromino, TetrominoColors } from "./state";
import {} from "./utils";

export const render = (ctx: CanvasRenderingContext2D, state: GameState) => {
  const drawCell = (position: Position, color: string) => {
    // TODO pull these out into styles?
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.fillRect(position.x * CELL_SIZE, position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.strokeRect(position.x * CELL_SIZE, position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  };

  const drawTetromino = (tetromino: Tetromino) => {
    const color = TetrominoColors[tetromino.type];
    const occupiedCells = getTetrominoPositions(tetromino);

    occupiedCells.forEach((cell) => {
      // absolute grid position for this tetromino
      const gridX = tetromino.position.x + cell.x;
      const gridY = tetromino.position.y + cell.y;
      drawCell(gridX, gridY, color);
    });
  }

  const drawGrid = (grid: Grid) => {
    ctx.fillStyle = '#808080';  // Medium gray
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    grid.cells.forEach((row: CellState[], rowIndex: number) => {
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
  drawGrid(state.grid);
  drawTetromino(state.currentTetromino);
}


/**
 * Assembles the grid showing current and previous tetrominoes
 * 
 * @param state object containing global state for the game
 * @returns canvas representing the main grid
 */
// export const Grid: React.FC<{state: GameState}> = ({state}) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   return (<canvas ref={canvasRef}
//     width={CANVAS_WIDTH}
//     height={CANVAS_HEIGHT} />);
// }

// TODO implement a useGrid?
// idk, not very React-ive