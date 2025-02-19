// 1: Define the Gameboard module
// The game board is stored as an array inside an IIFE (Immediately Invoked Function Expression).
// This ensures that the board is encapsulated and cannot be modified directly from the outside.

const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  // Returns the current game board
  const getBoard = () => board;

  // Places a marker (X or O) at a specific position
  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  // Resets the game board
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, placeMarker, resetBoard };
})();

// 2: Define Player Factory Function
// Creates player objects with a name and a marker (X or O)
const Player = (name, marker) => {
  return { name, marker };
};

// 3: Define Game Controller
// Controls the game flow, switches players, and checks for a winner or a draw

const GameController = (function () {
  let player1 = Player("Player 1", "X");
  let player2 = Player("Player 2", "O");
  let currentPlayer = player1;

  // Switches the current player
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateCurrentPlayerDisplay(); // Updates the display of the current player
  };

  // Returns the current player
  const getCurrentPlayer = () => currentPlayer;

  // Processes a game round
  const playRound = (index) => {
    if (Gameboard.placeMarker(index, currentPlayer.marker)) {
      console.log("Current board:", Gameboard.getBoard()); // Debugging
      if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer.name} wins!`), 100);
      } else if (checkDraw()) {
        setTimeout(() => alert("It's a draw!"), 100);
      } else {
        switchPlayer();
      }
    } else {
      alert("Field already occupied!");
    }
  };

  // Checks if a player has won
  const checkWin = () => {
    const board = Gameboard.getBoard();
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical
      [0, 4, 8],
      [2, 4, 6], // Diagonal
    ];
    return winningCombos.some(
      (combo) =>
        board[combo[0]] !== "" &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
    );
  };

  // Checks if the game is a draw
  const checkDraw = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  // Resets the game
  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    updateCurrentPlayerDisplay();
  };

  return {
    playRound,
    getCurrentPlayer,
    switchPlayer,
    checkWin,
    checkDraw,
    resetGame,
  };
})();

// 4: DOM Interaction
// Waits until the DOM is fully loaded

document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell"); // Retrieves all game cells
  const resetButton = document.getElementById("reset-btn");

  // Adds event listeners to each game cell
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = cell.getAttribute("data-index");
      const currentPlayer = GameController.getCurrentPlayer();

      // Checks if the field is empty and the move is valid
      if (Gameboard.placeMarker(index, currentPlayer.marker)) {
        cell.textContent = currentPlayer.marker; // Sets X or O on the board

        // Checks if someone has won
        if (GameController.checkWin()) {
          setTimeout(() => alert(`${currentPlayer.name} wins!`), 100);
        } else if (GameController.checkDraw()) {
          setTimeout(() => alert("It's a draw!"), 100);
        } else {
          GameController.switchPlayer();
        }
      } else {
        alert("Field already occupied!");
      }
    });
  });

  // Adds event listener for the reset button
  resetButton.addEventListener("click", () => {
    Gameboard.resetBoard();
    cells.forEach((cell) => (cell.textContent = "")); // Clears the cells
    GameController.resetGame();
  });

  // Initial display update for the current player
  updateCurrentPlayerDisplay();
});

// 5: Update the display for the current player
const updateCurrentPlayerDisplay = () => {
  const currentPlayer = GameController.getCurrentPlayer();
  document.getElementById(
    "current-player"
  ).textContent = `${currentPlayer.name} is on the move`;
};
