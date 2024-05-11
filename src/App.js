// App.js
import React, { useState } from 'react';
import SnakeGame from './SnakeGame';
import MainMenu from './MainMenu';
import './App.css';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleSettings = () => {
    // Implement settings functionality here
    alert('Settings');
  };

  const handleGameOver = () => {
    setGameStarted(false); // Set game state to false when game is over
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <MainMenu onStartGame={handleStartGame} onSettings={handleSettings} />
      ) : (
        <SnakeGame onGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default App;
