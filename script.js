// Game state
let player = "X";
let computer = "O";
let currentPlayer = player;
let gameboard = ["", "", "", "", "", "", "", "", ""];
let playerName = "";

document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player").value;

  if (playerName) {
    document.getElementById("player-input").style.display = "none"; // Hide player input and start button
    document.getElementById("gameboard-container").classList.remove("hidden"); // Show gameboard

    // Update the score display with the player's name
    document.querySelector(
      "#scores div:first-child"
    ).textContent = `${playerName}: `;
  } else {
    alert("Please enter your name.");
  }
});

// Event listeners for Restart and New Game buttons
document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame();
});

document.getElementById("new-game-btn").addEventListener("click", () => {
  resetGame();
  document.getElementById("player-input").style.display = "flex"; // Show player input and start button
  document.getElementById("gameboard-container").classList.add("hidden"); // Hide gameboard
  document.getElementById("player").value = ""; // Clear player input
  // Reset the score display
  document.querySelector("#scores div:first-child").textContent = `Player: `;
});

function resetGame() {
  gameboard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = player;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
  document.getElementById("result").textContent = "";
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
  if (!gameboard[index]) {
    gameboard[index] = currentPlayer;
    document.querySelector(`.cell[data-index="${index}"]`).textContent =
      currentPlayer;

    const winner = checkWinner();

    if (winner) {
      document.getElementById("result").textContent =
        winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
      updateScore(winner);
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
