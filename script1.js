const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const [a, b, c] of winningCombinations) {
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes('') ? null : 'T';
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;

    if (!gameActive || gameState[cellIndex]) return;

    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        if (winner === 'T') {
            alert("Ничья!");
        } else {
            alert(`${winner} выиграл!`);
        }
    } else if (currentPlayer === 'X') {
        currentPlayer = 'O';
        setTimeout(computerMove, 500);
    } else {
        currentPlayer = 'X';
    }
}

function computerMove() {
    const emptyIndices = gameState.map((val, index) => val === '' ? index : null).filter(val => val !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        if (winner === 'T') {
            alert("Ничья!");
        } else {
            alert(`${winner} выиграл!`);
        }
    } else {
        currentPlayer = 'X';
    }
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
