import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
      ))}
    </div>
  );
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    if (!gameStarted) {
      setGameStarted(true); // Set gameStarted to true on first move
    }
    
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setGameStarted(false); // Reset game start status
  }

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square !== null); // Check for a draw

  let status;
  if (!gameStarted) {
    status = "Click to start the game!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <h1 className="title">Tic-Tac-Toe by Akash E K, Student ID 24250436</h1>
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <button onClick={restartGame}>Restart Game</button>
          {gameStarted && (
            <ol>
              {history.slice(1).map((_, move) => (
                <li key={move}>
                  <button onClick={() => setCurrentMove(move)}>Move #{move}</button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
  ];
  
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];  // Return 'X' or 'O' if there is a winner
    }
  }
  
  return null;
}
