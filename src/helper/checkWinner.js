const checkVertical = (board, setWinnerCells) => {
  // Check only if row is 3 or greater
  for (let r = 3; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c]) {
        if (board[r][c] === board[r - 1][c]
            && board[r][c] === board[r - 2][c]
            && board[r][c] === board[r - 3][c]) {
          setWinnerCells([[r, c], [r - 1, c], [r - 2, c], [r - 3, c]]);
          return board[r][c];
        }
      }
    }
  }
};

const checkHorizontal = (board, setWinnerCells) => {
  // Check only if column is 3 or less
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r][c + 1]
          && board[r][c] === board[r][c + 2]
          && board[r][c] === board[r][c + 3]
        ) {
          setWinnerCells([[r, c], [r, c + 1], [r, c + 2], [r, c + 3]]);
          return board[r][c];
        }
      }
    }
  }
};

const checkDiagonalRight = (board, setWinnerCells) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let r = 3; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c + 1]
          && board[r][c] === board[r - 2][c + 2]
          && board[r][c] === board[r - 3][c + 3]
        ) {
          setWinnerCells([[r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3]]);
          return board[r][c];
        }
      }
    }
  }
};

const checkDiagonalLeft = (board, setWinnerCells) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let r = 3; r < 6; r++) {
    for (let c = 3; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c - 1]
          && board[r][c] === board[r - 2][c - 2]
          && board[r][c] === board[r - 3][c - 3]
        ) {
          setWinnerCells([[r, c], [r - 1, c - 1], [r - 2, c - 2], [r - 3, c - 3]]);
          return board[r][c];
        }
      }
    }
  }
};

const checkDraw = (board) => {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c] === null) {
        return null;
      }
    }
  }
  return 'draw';
};

const checkWinner = (board, setWinnerCells) => (
  checkVertical(board, setWinnerCells)
    || checkDiagonalRight(board, setWinnerCells)
    || checkDiagonalLeft(board, setWinnerCells)
    || checkHorizontal(board, setWinnerCells)
    || checkDraw(board, setWinnerCells)
);

export default checkWinner;
