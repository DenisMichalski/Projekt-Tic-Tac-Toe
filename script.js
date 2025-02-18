// 1: Define the Gameboard module
// The gameboard is stored as an array inside an IIFE (Immediately Invoked Function Expression).
// This ensures that the board is encapsulated and cannot be modified directly from the outside.

const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, placeMarker, resetBoard };
})();

// 2: Define Player Factory Function
// Each player has a name and a marker (X or O). This function creates player objects dynamically.

const Player = (name, marker) => {
  return { name, marker };
};

// 3: Define Game Controller
// Controls game flow: manages turns, checks for a winner, and handles the switching of players.


const GameController = (function () {
  let player1 = Player("Player 1", "X");
  let player2 = Player("Player 2", "O");
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playRound = (index) => {
    if (Gameboard.placeMarker(index, currentPlayer.marker)) {
      if (checkWin()) {
        console.log(`${currentPlayer.name} wins!`);
      } else {
        switchPlayer();
      }
    } else {
      console.log("Field already occupied!");
    }
  };

  const checkWin = () => {
    const board = Gameboard.getBoard();
    console.log(board);

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

  return { playRound };
})();
