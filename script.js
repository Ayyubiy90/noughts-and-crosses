let player = "X";
let computer = "O";
let currentPlayer = player;
let gameboard = ["", "", "", "", "", "", "", "", ""];
let playerName = "";
let gameOver = false;

document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player").value;

  if (playerName) {
    document.getElementById("player-input").style.display = "none";
    document.getElementById("gameboard-container").classList.remove("hidden");

    document.getElementById("player-name").textContent = `${playerName}: `;
  } else {
    alert("Please enter your name.");
  }
});

document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame(true);
  document.getElementById("player-input").style.display = "flex";
  document.getElementById("gameboard-container").classList.add("hidden");
  document.getElementById("player").value = "";
  document.getElementById("player-name").textContent = `Player: `;
});

document.getElementById("new-game-btn").addEventListener("click", () => {
  resetGame(false);
});

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

function updateScore(winner) {
  if (winner === player) {
    let playerScore = document.getElementById("player-score");
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else if (winner === computer) {
    let computerScore = document.getElementById("computer-score");
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }
}

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (currentPlayer === player) {
      makeMove(index);
    }
  });
});
