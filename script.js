
class Minesweeper {
    constructor() {

        // Variables

        this.amountOfMines = 10;
        this.cellsNumber = 0;
        this.board = Array(this.cellsNumber).fill('');
        this.cells = [];
        this.mines = [];
        this.safeCells = [];

        this.minesGenerated = false;
        this.isGameOver = false;

        // Components

        this.boardElement = document.querySelector('#board');

        // Buttons

        this.newGameButton = document.querySelector('#new_game_button');
        this.resetButton = document.querySelector('#reset_button');

        this.beginnerButton = document.querySelector('#beginner_button');
        this.mediumButton = document.querySelector('#medium_button');
        this.expertButton = document.querySelector('#expert_button');

        this.init(0);
    };

    init = (levelIndex) => {

        // Init config depending on difficulty setting
        this.cellsNumber = 0;
        if (levelIndex == 0) {
            this.amountOfMines = 10;
            this.cellsNumber = 81;
            this.boardElement.style.gridTemplateColumns = `repeat(${9}, ${25}px)`;
            this.boardElement.style.gridTemplateRows = `repeat(${9}, ${25}px)`;
        } else if (levelIndex == 1) {
            this.amountOfMines = 30;
            this.cellsNumber = 256;
            this.boardElement.style.gridTemplateColumns = `repeat(${16}, ${25}px)`;
            this.boardElement.style.gridTemplateRows = `repeat(${16}, ${25}px)`;
        } else if (levelIndex == 2) {
            this.amountOfMines = 50;
            this.cellsNumber = 400;
            this.boardElement.style.gridTemplateColumns = `repeat(${25}, ${25}px)`;
            this.boardElement.style.gridTemplateRows = `repeat(${16}, ${25}px)`;
        };

        // Reset elements
        this.board = Array(this.cellsNumber).fill('');
        this.boardElement.innerHTML = '';

        this.cells = [];
        this.mines = [];
        this.safeCells = [];

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
        this.newGameButton.addEventListener('click', () => this.newGame);
        this.resetButton.addEventListener('click', () => this.resetGame);

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
    }

    isMine = (index) => {
        // Return true if an index is mine
    }

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

        this.cells[index].style.width = `22px`;
        this.cells[index].style.height = `22px`;
        this.cells[index].style.borderWidth = `1px`;

    };

    handleLeftClick = (index) => {
        // Mark Cell as mine
    };

    cleanCell = (index) => {
        // Clean a cell
    }

    checkNeighbours = (index) => {
        // Check adjacent tiles, clean space till it founds a tile with a mine
    }
}

class Timer
{

}

new Minesweeper();