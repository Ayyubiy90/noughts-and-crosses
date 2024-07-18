document.getElementById("start-btn").addEventListener("click", () => {
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;

  if (player1Name && player2Name) {
    document.getElementById("player-input").classList.add("hidden");
    document.getElementById("gameboard-container").classList.remove("hidden");
  } else {
    alert("Please enter names for both players.");
  }
});
