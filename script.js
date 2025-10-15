
class Minesweeper {
    constructor() {

        // Variables

        this.amountOfMines = 0;

        this.cellsNumber = 0;
        this.rows = 0;
        this.columns = 0;

        this.board = Array(this.cellsNumber).fill('');
        this.cells = [];

        this.mines = [];
        this.safeCells = [];

        this.revealedTiles = 0;
        this.minesGenerated = false;
        this.isGameOver = false;

        // Components

        this.boardElement = document.querySelector('#board');

        // Buttons

        this.newGameButton = document.querySelector('#new_game_button');

        this.beginnerButton = document.querySelector('#beginner_button');
        this.mediumButton = document.querySelector('#medium_button');
        this.expertButton = document.querySelector('#expert_button');

        this.init(0);
    };

    init = (levelIndex) => {

        // Reset elements

        this.cellsNumber = 0;
        this.cells = [];
        this.mines = [];
        this.safeCells = [];

        this.isGameOver = false;

        // Init config depending on difficulty setting
        if (levelIndex == 0) {

            this.amountOfMines = 10;
            this.cellsNumber = 81;

            this.columns = 9;
            this.rows = 9;

        } else if (levelIndex == 1) {

            this.amountOfMines = 30;
            this.cellsNumber = 256;

            this.columns = 16;
            this.rows = 16;

        } else if (levelIndex == 2) {

            this.amountOfMines = 50;
            this.cellsNumber = 400;

            this.columns = 25;
            this.rows = 16;
        };

        this.boardElement.style.gridTemplateColumns = `repeat(${this.columns}, ${25}px)`;
        this.boardElement.style.gridTemplateRows = `repeat(${this.rows}, ${25}px)`;

        // Reset board
        this.board = Array(this.cellsNumber).fill('');
        this.boardElement.innerHTML = '';

        // Fill board info
        document.getElementById('mines-count').innerText = this.amountOfMines;

        // Fill board
        this.board.forEach((_, index) => {

            // Create a new element
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;

            // Add event listeners to element
            cell.addEventListener('click', () => this.handleClick(index));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.handleLeftClick(index);
            });

            // Add element to the board
            this.boardElement.appendChild(cell);
            this.cells.push(cell);
        });

        // Add event listeners
        this.newGameButton.addEventListener('click', () => this.newGame(0));

        this.beginnerButton.addEventListener('click', () => this.newGame(0));
        this.mediumButton.addEventListener('click', () => this.newGame(1));
        this.expertButton.addEventListener('click', () => this.newGame(2));
    };

    generateMines(index) {

        // Mark clicked index as safe
        // Add it to safe tiles list

        let minesPlaced = 0;
        while (minesPlaced < this.amountOfMines) {

            // Select a random tile, check that is not in the safe tile or occupied by another mine
            // Put mine in place

            minesPlaced++;
        }
    };

    isMine = (index) => {
        // Return true if an index is mine
    };

    newGame = (index) => {
        this.init(index);
    };

    resetGame = () => {

    };

    handleClick = (index) => {
        if (this.board[index] || this.isGameOver) return;

        if (!this.minesGenerated) {
            this.generateMines(index);
            this.minesGenerated = true;
        }

        let tile = this.cells[index];

    };

    // Handles flagging functionality
    handleLeftClick = (index) => {

        if (this.board[index] || this.isGameOver) return;

        let tile = this.cells[index];

        if (tile.innerText == "") {
            tile.classList.add('flagged-cell');
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩") {
            tile.classList.remove('flagged-cell');
            tile.innerText = "";
        }
    };

    cleanCell = (index) => {
        // Clean a cell
    };

    checkNeighbours = (index) => {
        // Check adjacent tiles, clean space till it founds a tile with a mine
    };

    // Converts 1D index → Row coordinate
    toX(index) {
        return index % this.rows;
    };

    // Converts 1D index → Column coordinate
    toY(index) {
        return Math.floor(index / this.columns);
    };

}

class Timer
{

}

new Minesweeper();