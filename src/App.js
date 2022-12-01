import React, { useEffect, useState } from 'react';
import checkWinner from './helper/checkWinner';
import './App.css';

const boardInfo = {
  rows: 6,
  cols: 7,
  player1: 'red',
  player2: 'blue',
};

const createBoard = () => new Array(boardInfo.rows).fill(null).map(
  () => new Array(boardInfo.cols).fill(null),
);

const getColor = (value) => {
  if (value === boardInfo.player1) return '!bg-red-300';
  if (value === boardInfo.player2) return '!bg-blue-300';
  return '!bg-white';
};

const generateTitle = (winner, currentPlayer) => {
  if (winner === boardInfo.player1 || winner === boardInfo.player2) return `${winner} is the winner!`;
  if (winner === 'draw') return 'Equal!';
  return `${currentPlayer}'s turn`;
};

function App() {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState(boardInfo.player1);
  const [winner, setWinner] = useState(null);
  const [winnerCells, setWinnerCells] = useState([]);

  const play = (rowIndex, colIndex) => {
    const current = (currentPlayer === boardInfo.player1) ? boardInfo.player2 : boardInfo.player1;
    setCurrentPlayer(current);
    board[rowIndex][colIndex] = currentPlayer;
  };

  const resetPlay = () => {
    setBoard(createBoard());
    setCurrentPlayer(boardInfo.player1);
    setWinner(null);
    setWinnerCells([]);
  };

  const getWinnerStyle = (rowIndex, colIndex) => {
    const item = [rowIndex, colIndex];
    const itemString = JSON.stringify(item);
    const isCellInBoard = winnerCells.some((cell) => JSON.stringify(cell) === itemString);
    const newColor = winner === boardInfo.player1 ? '!bg-red-500' : '!bg-blue-500';
    return isCellInBoard && `blink ${newColor}`;
  };

  useEffect(() => {
    const win = checkWinner(board, setWinnerCells);
    if (win) setWinner(win);
  }, [currentPlayer]);

  return (
    <div className="App px-4 py-10 md:p-20">
      <h1 className="text-4xl text-center font-medium first-letter:uppercase">
        {generateTitle(winner, currentPlayer)}
      </h1>

      <div className="board bg-gray-200 w-fit block mx-auto py-3 px-2 rounded-3xl mt-8">
        {board.map((rows, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {rows.map((col, colIndex) => (
              <div className="h-12 w-12 md:h-24 md:w-24 flex justify-center items-center" key={colIndex}>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  disabled={winner}
                  className={`board-block h-9 w-9 md:h-20 md:w-20 bg-white rounded-full m-1 md:m-2 flex justify-center items-center ${getColor(col)} ${getWinnerStyle(rowIndex, colIndex)}`}
                  onClick={() => play(rowIndex, colIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {winner && (
        <div className="text-center">
          <button
            type="button"
            className="text-xl rounded-lg mt-8 px-4 py-3 bg-blue-500 text-white"
            onClick={resetPlay}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
