import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" disabled>Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div
          className="container"
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div className="hero" style={{ paddingBottom: 0, paddingTop: 130 }}>
            <div className="subtitle" style={{ color: '#222222', marginBottom: 24 }}>
              Classic Two-Player
            </div>
            <h1 className="title" style={{ color: '#4caf50', fontWeight: 700, marginBottom: 7, letterSpacing: '2px', textShadow: '0 1px 3px #fff5' }}>
              Tic Tac Toe
            </h1>
            <div className="description" style={{ color: '#222222', marginBottom: 27 }}>
              Play head-to-head on a simple 3x3 board. Get three in a row to win!
            </div>
          </div>
          <TicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;