document.getElementById("start-btn").addEventListener("click", () => {
  const playerName = document.getElementById("player").value;

  if (playerName) {
    document.getElementById("player-input").classList.add("hidden");
    document.getElementById("gameboard-container").classList.remove("hidden");
  } else {
    alert("Please enter your name.");
  }
});
