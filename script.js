let player = "X";
let computer = "O";
let currentPlayer = player;
let gameboard = ["", "", "", "", "", "", "", "", ""];
let playerName = "";
let gameOver = false;

document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player").value;

  if (playerName) {
    document.getElementById("player-input").style.display = "none"; // Hide player input and start button
    document.getElementById("gameboard-container").classList.remove("hidden"); // Show gameboard

    // Update the score display with the player's name
    document.getElementById("player-name").textContent = `${playerName}: `;
  } else {
    alert("Please enter your name.");
  }
});

document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame(true);
  document.getElementById("player-input").style.display = "flex"; // Show player input and start button
  document.getElementById("gameboard-container").classList.add("hidden"); // Hide gameboard
  document.getElementById("player").value = ""; // Clear player input
  document.getElementById("player-name").textContent = `Player: `;
});

document.getElementById("new-game-btn").addEventListener("click", () => {
  resetGame(false);
});

document.getElementById("modal-ok-btn").addEventListener("click", closeModal);
document.querySelector(".close-btn").addEventListener("click", closeModal);

function resetGame(resetScores) {
  gameboard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = player;
  gameOver = false;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
  document.getElementById("result").textContent = "";

  if (resetScores) {
    document.getElementById("player-score").textContent = "0";
    document.getElementById("computer-score").textContent = "0";
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameboard[a] &&
      gameboard[a] === gameboard[b] &&
      gameboard[a] === gameboard[c]
    ) {
      return gameboard[a];
    }
  }

  if (!gameboard.includes("")) {
    return "Tie";
  }

  return null;
}

function makeMove(index) {
  if (!gameboard[index] && !gameOver) {
    gameboard[index] = currentPlayer;
    document.querySelector(`.cell[data-index="${index}"]`).textContent =
      currentPlayer;

    const winner = checkWinner();

    if (winner) {
      gameOver = true;
      if (winner === "Tie") {
        showModal(`It's a tie!`);
        resetGame(false);
      } else if (winner === player) {
        showModal(`${playerName} (X) wins!`);
        updateScore(player);
        resetGame(false);
      } else {
        showModal(`Computer (O) wins!`);
        updateScore(computer);
        resetGame(false);
      }
    } else {
      currentPlayer = currentPlayer === player ? computer : player;
      if (currentPlayer === computer) {
        makeComputerMove();
      }
    }
  }
}

function makeComputerMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < gameboard.length; i++) {
    if (gameboard[i] === "") {
      gameboard[i] = computer;
      let score = minimax(gameboard, 0, false);
      gameboard[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  makeMove(move);
}

const scores = {
  X: -1,
  O: 1,
  Tie: 0,
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = computer;
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player;
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function updateScore(winner) {
  if (winner === player) {
    let playerScore = document.getElementById("player-score");
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else if (winner === computer) {
    let computerScore = document.getElementById("computer-score");
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }
}

function showModal(message) {
  document.getElementById("modal-result").textContent = message;
  document.getElementById("result-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("result-modal").style.display = "none";
  resetGame(false);
}

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (currentPlayer === player) {
      makeMove(index);
    }
  });
});
