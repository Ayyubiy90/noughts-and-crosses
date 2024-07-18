document.getElementById("start-btn").addEventListener("click", () => {
  const playerName = document.getElementById("player").value;

  if (playerName) {
    document.getElementById("player-input").style.display = "none"; // Hide player input and start button
    document.getElementById("gameboard-container").classList.remove("hidden"); // Show gameboard
  } else {
    alert("Please enter your name.");
  }
});
