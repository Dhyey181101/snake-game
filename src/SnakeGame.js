import React, { useState, useEffect, useCallback } from 'react';
import './SnakeGame.css';
import eatSound from './eat.mp3'; // Import the eat sound file
import gameOverSound from './gameOver.mp3'; // Import the game over sound file

const SnakeGame = ({ onGameOver,setHighScore, highScore}) => {
  const gridSize = 20;
  const canvasWidth = 400;
  const canvasHeight = 400;
  const initialLives = 3; // Initial number of lives

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [apple, setApple] = useState({ x: Math.floor(Math.random() * (canvasWidth / gridSize)), y: Math.floor(Math.random() * (canvasHeight / gridSize)) });
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(100);
  
  const [lives, setLives] = useState(initialLives); // State variable for lives

  const [playEatSound, setPlayEatSound] = useState(false);
  const [playGameOverSound, setPlayGameOverSound] = useState(false);

  useEffect(() => {
    if (playEatSound) {
      const audio = new Audio(eatSound);
      audio.play();
      audio.onended = () => setPlayEatSound(false);
    }
  }, [playEatSound]);

  useEffect(() => {
    if (playGameOverSound) {
      const audio = new Audio(gameOverSound);
      audio.play();
      audio.onended = () => setPlayGameOverSound(false);
    }
  }, [playGameOverSound]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp' && dy === 0) {
      setDx(0);
      setDy(-1);
    } else if (e.key === 'ArrowDown' && dy === 0) {
      setDx(0);
      setDy(1);
    } else if (e.key === 'ArrowLeft' && dx === 0) {
      setDx(-1);
      setDy(0);
    } else if (e.key === 'ArrowRight' && dx === 0) {
      setDx(1);
      setDy(0);
    }
  }, [dx, dy]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const moveSnake = () => {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      const newSnake = [head, ...snake];

      if (head.x === apple.x && head.y === apple.y) {
        setScore(score + 1);
        generateApple(newSnake);
        setPlayEatSound(true); // Trigger sound effect
      } else {
        newSnake.pop();
      }

      if (checkCollision(newSnake)) {
        if (lives > 1) { // Decrease lives if there are more than 1 life left
          setLives(lives - 1);
          resetGame();
        } else {
          gameOver();
        }
        return;
      }

      setSnake(newSnake);
    };

    const gameLoop = setInterval(moveSnake, speed);

    return () => clearInterval(gameLoop);
  }, [snake, dx, dy, apple, score, speed, lives]);

  useEffect(() => {
    if (score > highScore) {
      localStorage.setItem('snakeHighScore', score);
      setHighScore(score);
    }
  }, [score, highScore]);

  const generateApple = (newSnake) => {
    let newApple;
    do {
      newApple = { x: Math.floor(Math.random() * (canvasWidth / gridSize)), y: Math.floor(Math.random() * (canvasHeight / gridSize)) };
    } while (newSnake.some(segment => segment.x === newApple.x && segment.y === newApple.y));

    setApple(newApple);
  };

  const checkCollision = (newSnake) => {
    const head = newSnake[0];
    return (
      head.x < 0 || head.x >= canvasWidth / gridSize ||
      head.y < 0 || head.y >= canvasHeight / gridSize ||
      newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
  };

  const gameOver = () => {
    setPlayGameOverSound(true); // Trigger game over sound effect
    alert(`Game Over! Your score is ${score}`);
    onGameOver();
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setApple({ x: Math.floor(Math.random() * (canvasWidth / gridSize)), y: Math.floor(Math.random() * (canvasHeight / gridSize)) });
    setDx(0);
    setDy(0);
    setScore(0);
    setSpeed(100);
  };

  const renderSnake = () => {
    return snake.map((segment, index) => (
      <div key={index} className={`snake-segment${index === 0 ? ' snake-head' : index === snake.length - 1 ? ' snake-tail' : ''}`} style={{ left: segment.x * gridSize, top: segment.y * gridSize }}></div>
    ));
  };

  const renderLives = () => {
    const hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push('❤️'); // Use heart emoji character
    }
    return hearts;
  };

  return (
    <div className="snake-game">
      <div className="game-canvas">
        {renderSnake()}
        <div className="apple" style={{ left: apple.x * gridSize, top: apple.y * gridSize }}></div>
      </div>
      <div className="score">Score: {score}</div>
      <div className="lives">Lives: {renderLives()}</div> {/* Display heart emojis for lives */}
      <div className="high-score">High Score: {highScore}</div>
      <div className="speed-selector">
        <label htmlFor="speed">Select Speed:</label>
        <select id="speed" onChange={(e) => setSpeed(parseInt(e.target.value))}>
          <option value="100">Slow</option>
          <option value="50">Medium</option>
          <option value="20">Fast</option>
        </select>
      </div>
    </div>
  );
};

export default SnakeGame;
