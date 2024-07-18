// Game state
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

// Event listeners for Restart and New Game buttons
document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame(true);
  document.getElementById("player-input").style.display = "flex"; // Show player input and start button
  document.getElementById("gameboard-container").classList.add("hidden"); // Hide gameboard
  document.getElementById("player").value = ""; // Clear player input
  // Reset the score display
  document.getElementById("player-name").textContent = `Player: `;
});

document.getElementById("new-game-btn").addEventListener("click", () => {
  resetGame(false);
});

// Reset game function
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

// Function to check for a win or tie
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

// Function to handle player moves
function makeMove(index) {
  if (!gameboard[index] && !gameOver) {
    gameboard[index] = currentPlayer;
    document.querySelector(`.cell[data-index="${index}"]`).textContent =
      currentPlayer;

    const winner = checkWinner();

    if (winner) {
      gameOver = true;
      if (winner === "Tie") {
        document.getElementById("result").textContent = `It's a tie!`;
        alert(`It's a tie!`);
        resetGame(false);
      } else if (winner === player) {
        document.getElementById(
          "result"
        ).textContent = `${playerName} (X) wins!`;
        alert(`${playerName} (X) wins!`);
        updateScore(player);
        resetGame(false);
      } else {
        document.getElementById("result").textContent = `Computer (O) wins!`;
        alert(`Computer (O) wins!`);
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

// Function to handle computer moves (simple random move for now)
function makeComputerMove() {
  let availableMoves = gameboard
    .map((val, index) => (val === "" ? index : null))
    .filter((val) => val !== null);

  if (availableMoves.length > 0) {
    let move =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(move);
  }
}

// Function to update the score
function updateScore(winner) {
  if (winner === player) {
    let playerScore = document.getElementById("player-score");
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else if (winner === computer) {
    let computerScore = document.getElementById("computer-score");
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }
}

// Add event listeners to gameboard cells
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (currentPlayer === player) {
      makeMove(index);
    }
  });
});
