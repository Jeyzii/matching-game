// Create an array with pairs of image sources for matching tiles
const imageSources = [
    '_image1.jpg',
    '_image2.jpg',
    '_image3.jpg',
    '_image4.jpg',
    '_image5.jpg',
    '_image6.jpg',
    '_image7.jpg',
    '_image8.jpg'
];
const tileValues = [...imageSources, ...imageSources];

// Shuffle the tile values
tileValues.sort(() => Math.random() - 0.5);

// Initialize variables
let firstFlippedTile = null;
let secondFlippedTile = null;
let isFlipping = false;

// Function to handle tile click
function handleTileClick(tile, index) {
    if (isFlipping || tile.classList.contains('matched')) return;

    tile.innerHTML = `<img src="${tileValues[index]}" alt="Tile">`;
    tile.classList.add('flipped');

    if (!firstFlippedTile) {
        firstFlippedTile = { tile, index };
    } else {
        secondFlippedTile = { tile, index };
        isFlipping = true;

        // Check if the tiles match
        if (tileValues[firstFlippedTile.index] === tileValues[secondFlippedTile.index]) {
            setTimeout(() => {
                firstFlippedTile.tile.classList.add('matched');
                secondFlippedTile.tile.classList.add('matched');
                resetFlippedTiles();
            }, 1000);
        } else {
            setTimeout(() => {
                firstFlippedTile.tile.innerHTML = '';
                secondFlippedTile.tile.innerHTML = '';
                firstFlippedTile.tile.classList.remove('flipped');
                secondFlippedTile.tile.classList.remove('flipped');
                resetFlippedTiles();
            }, 1000);
        }
    }
}

// Function to reset flipped tiles
function resetFlippedTiles() {
    firstFlippedTile = null;
    secondFlippedTile = null;
    isFlipping = false;

    // Check if all tiles are matched
    const allMatched = document.querySelectorAll('.tile:not(.matched)').length === 0;
    if (allMatched) {
        setTimeout(() => {
            alert('Congratulations! You matched all tiles.');
            openCustomAlert();
            resetGame();
        }, 500);
    }
}

// Function to reset the game
function resetGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    tileValues.sort(() => Math.random() - 0.5);

    for (let i = 0; i < tileValues.length; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', () => handleTileClick(tile, i));
        gameBoard.appendChild(tile);
    }
}

function openCustomAlert() {
    document.getElementById("customModal").style.display = "block";
}

function closeCustomAlert() {
    document.getElementById("customModal").style.display = "none";
}

// Function to update the message below the buttons
function updateMessage(buttonNumber) {
    const messageContainer = document.getElementById('messageContainer');

    // Display a message based on the button clicked
    switch (buttonNumber) {
        case 1:
            messageContainer.textContent = "I LOVE YOU SO MUCH!";
            break;
        case 2:
            messageContainer.textContent = "I LOVE YOU VERY MUCH!";
            break;
        default:
            messageContainer.textContent = "";
    }
}

// Initialize the game board
document.addEventListener('DOMContentLoaded', resetGame);
