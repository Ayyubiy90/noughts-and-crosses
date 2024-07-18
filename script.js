document.getElementById("start-btn").addEventListener("click", () => {
  const playerName = document.getElementById("player").value;

  if (playerName) {
    document.getElementById("player-input").style.display = "none"; // Hide player input and start button
    document.getElementById("gameboard-container").classList.remove("hidden"); // Show gameboard
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
});

// Function to reset the game (implement as needed)
function resetGame() {
  // Add your reset game logic here
  // Example: clear the gameboard, reset scores, etc.
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
  document.getElementById("result").textContent = "";
}
