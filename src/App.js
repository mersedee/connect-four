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
  if (value === boardInfo.player1) return 'bg-red-300';
  if (value === boardInfo.player2) return 'bg-blue-300';
  return 'bg-white';
};

function App() {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState(boardInfo.player1);
  const [winner, setWinner] = useState(null);

  const play = (rowIndex, colIndex) => {
    const current = (currentPlayer === boardInfo.player1) ? boardInfo.player2 : boardInfo.player1;
    setCurrentPlayer(current);
    board[rowIndex][colIndex] = currentPlayer;
  };

  const resetPlay = () => {
    setBoard(createBoard());
    setCurrentPlayer(boardInfo.player1);
    setWinner(null);
  };

  useEffect(() => {
    const win = checkWinner(board);
    if (win) setWinner(win);
  }, [currentPlayer]);

  return (
    <div className="App p-20">
      <h1 className="text-4xl text-center font-medium first-letter:uppercase">
        {currentPlayer}
        &apos;s turn
      </h1>

      <div className="bg-gray-200 w-fit block mx-auto py-3 px-2 rounded-3xl mt-8">
        {board.map((rows, rowIndex) => (
          <div className="flex">
            {rows.map((col, colIndex) => (
              <div className="h-24 w-24 flex justify-center items-center">
                <button
                  type="button"
                  className={`h-20 w-20 bg-white rounded-full m-2 flex justify-center items-center ${getColor(col)}`}
                  onClick={() => play(rowIndex, colIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {winner && (
        <div className="text-center">
          <div className="text-2xl first-letter:uppercase mt-8">
            {winner}
            {' '}
            is winner!
          </div>
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
