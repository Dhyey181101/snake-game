// MainMenu.js
import React from 'react';

const MainMenu = ({ onStartGame, highScore }) => {
  return (
    <div className="main-menu">
      <h1>Snake Game</h1>
      <button onClick={onStartGame}>Start Game</button>
      <div>High Score: {highScore}</div> {/* Display high score */}
    </div>
  );
};

export default MainMenu;
