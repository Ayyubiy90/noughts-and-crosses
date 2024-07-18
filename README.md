# Noughts and Crosses

A simple Tic-Tac-Toe game implemented using HTML, CSS, and JavaScript.

## Project Description

This project involves creating a Tic-Tac-Toe game where the gameboard is stored as an array inside a Gameboard object. Players are also stored in objects, and an object controls the flow of the game itself. The goal is to minimize global code by using factories and the module pattern.

## Features

- Gameboard managed as an array within a Gameboard object
- Player objects to handle player data
- Game flow control through a dedicated object
- Console-based game logic for initial development
- DOM manipulation for interactive gameplay
- Logic to detect wins, losses, and ties
- Player name input, game start/restart, and game result display

## Project Structure

- **index.html**: The main HTML file
- **style.css**: The CSS file for styling the game
- **script.js**: The JavaScript file containing game logic

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayyubiy90/noughts-and-crosses.git
   ```
2. Navigate to the project directory:
   ```bash
   cd noughts-and-crosses
   ```
3. Open `index.html` in your browser to see the game in action.

## How to Play

1. Enter player names.
2. Click the "Start Game" button.
3. Players take turns clicking on the gameboard to place their markers.
4. The game will announce the winner or a tie once the game ends.
5. Click the "Restart Game" button to play again.

## Future Enhancements

- Add a scoring system to track multiple rounds.
- Implement an AI opponent for single-player mode.
- Improve the user interface with animations and better styling.

## Contributing

Feel free to submit issues and enhancement requests. Contributions are welcome!

## License

This project is licensed under the MIT License.