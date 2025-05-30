import React, { useState } from 'react';

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * TicTacToe main component implementing:
   * - Two Player Mode (turn-based)
   * - Win and Draw Detection
   * - Restart Game
   * - Centered, light-themed layout
   * 
   * Color scheme from requirements:
   *  - Primary: #ffffff (grid background)
   *  - Secondary: #222222 (text, borders)
   *  - Accent:   #4caf50 (win highlight, buttons)
   */

  // Board state: 9 cells, initialized as null
  const [board, setBoard] = useState(Array(9).fill(null));
  // true: X's turn, false: O's turn
  const [isXNext, setIsXNext] = useState(true);
  // "X", "O", "draw", or null
  const [status, setStatus] = useState(null);

  // Winning position if any, else empty array
  const [winLine, setWinLine] = useState([]);

  /**
   * Checks for win or draw and updates state accordingly.
   * Called after each move.
   * @param {Array} squares - Current board state
   */
  function checkGameStatus(squares) {
    // List of winning triplets (indexes)
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setStatus(squares[a]);
        setWinLine(line);
        return;
      }
    }
    if (squares.every(cell => cell)) {
      setStatus('draw');
      setWinLine([]);
    }
  }

  /**
   * Handles a user clicking a cell.
   * @param {number} idx - index of clicked cell
   */
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (status || board[idx]) return; // ignore if game over or occupied

    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
    checkGameStatus(nextBoard);
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus(null);
    setWinLine([]);
  }

  // Render helpers
  function renderCell(idx) {
    const value = board[idx];
    // Highlight cell if part of winning line
    const isWinner = winLine.includes(idx);
    return (
      <button
        key={idx}
        className="ttt-cell"
        disabled={!!board[idx] || !!status}
        style={{
          color: value === 'X' ? '#222222' : '#4caf50',
          background: isWinner ? '#4caf50' : '#ffffff',
          borderColor: isWinner ? '#4caf50' : '#222222'
        }}
        onClick={() => handleClick(idx)}
        aria-label={`cell ${idx}`}
        tabIndex={0}
      >
        {value}
      </button>
    );
  }

  // Status message
  let message;
  if (status === 'X') {
    message = (
      <span style={{ color: '#4caf50' }}>
        🏆 Player X wins!
      </span>
    );
  } else if (status === 'O') {
    message = (
      <span style={{ color: '#4caf50' }}>
        🏆 Player O wins!
      </span>
    );
  } else if (status === 'draw') {
    message = <span style={{ color: '#222222' }}>It's a draw!</span>;
  } else {
    message = (
      <span>
        <span style={{ color: isXNext ? '#222222' : '#4caf50', fontWeight: 600 }}>
          Player {isXNext ? 'X' : 'O'}
        </span>
        {"'s turn"}
      </span>
    );
  }

  return (
    <div className="ttt-wrapper">
      <div className="ttt-status" data-testid="status">{message}</div>
      <div className="ttt-board" data-testid="board">
        {Array(3).fill(0).map((_, row) => (
          <div className="ttt-row" key={row}>
            {Array(3).fill(0).map((_, col) => renderCell(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="ttt-footer">
        <button
          className="ttt-restart-btn"
          onClick={restartGame}
          style={{
            background: '#4caf50',
            color: '#ffffff',
            border: 'none',
            borderRadius: 4,
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: 16
          }}
        >
          Restart Game
        </button>
      </div>
      {/* Inline styling for the component, to follow light theming and color scheme */}
      <style>{`
        .ttt-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 18px;
          max-width: 350px;
          margin: 48px auto;
          padding: 40px 28px 28px 28px;
          box-shadow: 0 2px 20px rgba(34,34,34,0.10);
        }
        .ttt-status {
          margin-bottom: 32px;
          font-size: 1.23rem;
          font-weight: 600;
          text-align: center;
        }
        .ttt-board {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ttt-row {
          display: flex;
          flex-direction: row;
        }
        .ttt-cell {
          width: 70px;
          height: 70px;
          font-size: 2.6rem;
          font-weight: 700;
          border: 2.5px solid #222222;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          transition: background 0.21s, color 0.21s;
          cursor: pointer;
          margin: 0;
          outline: none;
          border-radius: 10px;
          margin-right: 9px;
          margin-bottom: 9px;
          box-shadow: 0 0px 7px rgba(76,175,80,0.03);
        }
        .ttt-cell:last-child {
          margin-right: 0;
        }
        .ttt-row:last-child .ttt-cell {
          margin-bottom: 0;
        }
        .ttt-cell:disabled {
          opacity: 0.7;
          cursor: default;
        }
        .ttt-footer {
          margin-top: 23px;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        @media (max-width:500px) {
          .ttt-wrapper {
            max-width: 97vw;
            padding: 16px;
          }
          .ttt-cell {
            width: 21vw;
            height: 21vw;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default TicTacToe;
