const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
};
let dx = 0,
  dy = 0;
let score = 0;
let directionLock = false; // Prevents multiple direction changes within one update

// Draw the game board
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
  drawScore();
  checkCollision();
  directionLock = false; // Reset direction lock for the next frame
  setTimeout(drawGame, 100);
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((part) => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Draw the score on the canvas
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, canvas.width - 80, 20);
}

// Move the snake and grow it if it eats the food
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++; // Increase score when food is eaten
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } else {
    snake.pop();
  }
}

// Handle collisions with walls and itself
function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount ||
    snake.slice(1).some((part) => part.x === head.x && part.y === head.y)
  ) {
    alert("Game Over! Your score was: " + score);
    resetGame();
  }
}

// Reset the game after game over
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
}

// Change snake direction based on arrow keys, with direction lock
document.addEventListener("keydown", (event) => {
  if (!directionLock) {
    // Only allow one direction change per game update
    if (event.key === "ArrowUp" && dy === 0) {
      dx = 0;
      dy = -1;
      directionLock = true;
    } else if (event.key === "ArrowDown" && dy === 0) {
      dx = 0;
      dy = 1;
      directionLock = true;
    } else if (event.key === "ArrowLeft" && dx === 0) {
      dx = -1;
      dy = 0;
      directionLock = true;
    } else if (event.key === "ArrowRight" && dx === 0) {
      dx = 1;
      dy = 0;
      directionLock = true;
    }
  }
});

// Start the game
drawGame();
