

const bird = document.getElementById('bird');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');

let birdTop = 250;
let gravity = 2;
let isGameOver = false;
let score = 0;

function fly() {
  birdTop -= 40; 
}

function applyGravity() {
  if (!isGameOver) {
    birdTop += gravity;
    bird.style.top = birdTop + 'px';
  }
}


document.addEventListener('keydown', function(e) {
  if (e.code === 'Space') fly();
});
gameArea.addEventListener('click', fly);

function generatePipes() {
  const pipeHeight = Math.floor(Math.random() * 200) + 100;
  const pipeGap = 150;

  const upperPipe = document.createElement('div');
  const lowerPipe = document.createElement('div');
  
  upperPipe.classList.add('pipe');
  lowerPipe.classList.add('pipe', 'lower');

  upperPipe.style.height = pipeHeight + 'px';
  lowerPipe.style.height = (600 - pipeHeight - pipeGap) + 'px';

  gameArea.appendChild(upperPipe);
  gameArea.appendChild(lowerPipe);

  
  const pipeInterval = setInterval(() => {
    const upperPipeRight = upperPipe.getBoundingClientRect().right;
    const lowerPipeRight = lowerPipe.getBoundingClientRect().right;
    const birdRect = bird.getBoundingClientRect();
    
    if (
      (upperPipeRight > birdRect.left && upperPipeRight < birdRect.right && 
       birdRect.top < pipeHeight) ||
      (lowerPipeRight > birdRect.left && lowerPipeRight < birdRect.right && 
       birdRect.bottom > (600 - lowerPipe.style.height.replace('px', ''))) ||
      birdRect.bottom >= 600 || birdRect.top <= 0
    ) {
      gameOver(pipeInterval, upperPipe, lowerPipe); 
    }

    if (upperPipeRight < 50) {
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
    }

  }, 20);

  
  setTimeout(() => {
    gameArea.removeChild(upperPipe);
    gameArea.removeChild(lowerPipe);
    clearInterval(pipeInterval);
  }, 3000);
}

function gameOver(interval, upperPipe, lowerPipe) {
  isGameOver = true;
  clearInterval(interval);
  alert('Game Over! Final score: ' + score);
  gameArea.removeChild(upperPipe);
  gameArea.removeChild(lowerPipe);
  document.location.reload();
}


setInterval(applyGravity, 20);
setInterval(generatePipes, 3000); 
