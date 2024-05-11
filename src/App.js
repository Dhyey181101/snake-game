// App.js
import React, { useState } from 'react';
import SnakeGame from './SnakeGame';
import MainMenu from './MainMenu';
import './App.css';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const storedHighScore = localStorage.getItem('snakeHighScore');
    return storedHighScore ? parseInt(storedHighScore) : 0;
  });

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleSettings = () => {
    // Implement settings functionality here
    alert('Settings');
  };

  const handleGameOver = (score) => { // Update to receive score parameter
    setGameStarted(false); // Set game state to false when game is over
    if (score > highScore) {
      setHighScore(score); // Update the high score if it's higher than the current high score
      localStorage.setItem('snakeHighScore', score); // Update local storage as well
    }
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <MainMenu onStartGame={handleStartGame} onSettings={handleSettings} highScore={highScore} />
      ) : (
        <SnakeGame onGameOver={handleGameOver} setHighScore={setHighScore} highScore={highScore} /> // Pass setHighScore callback
      )}
    </div>
  );
};

export default App;
