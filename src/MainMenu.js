// MainMenu.js
import React from 'react';

const MainMenu = ({ onStartGame, onSettings }) => {
  return (
    <div className="main-menu">
      <h1>Snake Game</h1>
      <button onClick={onStartGame}>Play</button>
      <button onClick={onSettings}>Settings</button>
    </div>
  );
};

export default MainMenu;
