
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

    // Initialize the game
    init = (levelIndex) => {

        // Reset elements

        this.revealedTiles = 0;
        this.cellsNumber = 0;
        this.cells = [];
        this.mines = [];
        this.safeCells = [];
        this.minesGenerated = false;
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

        this.boardElement.style.gridTemplateColumns = `repeat(${this.columns}, ${27}px)`;
        this.boardElement.style.gridTemplateRows = `repeat(${this.rows}, ${27}px)`;

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

    // Generates mines in the board
    generateMines(index) {

        // Add clicked cell to safe cells list
        this.safeCells.push(index);

        let minesPlaced = 0;
        while (minesPlaced < this.amountOfMines) {

            // Select a random tile, check that is not in the safe tile or occupied by another mine
            let newIndex = this.getRandomInt(this.cells.length)
            if (!this.safeCells.includes(newIndex) && !this.mines.includes(newIndex)) {
                // Put mine in available place
                this.mines.push(newIndex);
                minesPlaced++;
            };
        };
    };

    // Starts a new game with the given difficulty setting
    newGame = (index) => {
        this.init(index);
    };

    // Handles left click functionality
    handleClick = (index) => {

        // If game is over return
        if (this.isGameOver) return;

        // If first click, generate mines
        if (!this.minesGenerated) {
            this.generateMines(index);
            this.minesGenerated = true;
        };

        // Get evaluated tile
        let tile = this.cells[index];

        // Do not evaluate if tile is flagged
        if (tile.innerText == "🚩") return;

        // Check if tile is a bomb
        if (this.checkCell(index)) {

            this.revealAllMines();
            this.isGameOver = true;

            //TODO: AT YOU LOST POP UP
        }
        else {

            this.cleanCell(index, true);

            // If all safe tiles revealed, end game
            if (this.revealedTiles == (this.cells.length - this.amountOfMines)) {

                this.isGameOver = true;
                //TODO: AT YOU WON POP UP
            };
        };
    };

    // Handles right click (flagging) functionality
    handleLeftClick = (index) => {

        // If game is over return
        if (this.isGameOver) return;

        // Get evaluated tile
        let tile = this.cells[index];

        // Check if player is not able to flag another tile
        if (this.amountOfMines <= 0) {
            if (tile.innerText == "🚩") {
                tile.classList.remove('flagged-cell');
                tile.innerText = "";
                this.amountOfMines++;
                return;
            }
            else return;
        };

        // Check if tile is not flagged
        if (tile.innerText == "") {

            tile.classList.add('flagged-cell');
            tile.innerText = "🚩";
            this.amountOfMines--;
        }
        else if (tile.innerText == "🚩") {

            tile.classList.remove('flagged-cell');
            tile.innerText = "";
            this.amountOfMines++;
        };

        // Update mines counter
        document.getElementById('mines-count').innerText = this.amountOfMines;
    };

    // Cleans a cell
    cleanCell = (index, checkNeighbours) => {

        // Add revealed class to the cell
        let tile = this.cells[index];
        tile.classList.add('revealed-cell');

        // Add other classes depending on adjacent mines
        let neighbours = this.checkNeighbourMines(index);
        switch (neighbours) {
            case 1:
                tile.classList.add('revealed-x1-cell');
                tile.innerText = "1";
                break;
            case 2:
                tile.classList.add('revealed-x2-cell');
                tile.innerText = "2";
                break;
            case 3:
                tile.classList.add('revealed-x3-cell');
                tile.innerText = "3";
                break;
            case 4:
                tile.classList.add('revealed-x4-cell');
                tile.innerText = "4";
                break;
            case 5:
                tile.classList.add('revealed-x5-cell');
                tile.innerText = "5";
                break;
            case 6:
                tile.classList.add('revealed-x6-cell');
                tile.innerText = "6";
                break;
            case 7:
                tile.classList.add('revealed-x7-cell');
                tile.innerText = "7";
                break;
            case 8:
                tile.classList.add('revealed-x8-cell');
                tile.innerText = "8";
                break;
        }

        this.revealedTiles++;
        this.safeCells.push(index);
        if (checkNeighbours) this.checkNeighbours(index);
    };

    // Checks if a cell has a mine
    checkCell = (index) => {
        if (this.mines.includes(index)) return true;
        else return false;
    };

    // Checks the cells around a certain cell
    checkNeighbours = (index) => {

        // Get adjacent cells
        let adjacentCells = this.getAdjacentCells(index);

        adjacentCells.forEach((cellIndex, _) => {

            let neighbours = this.checkNeighbourMines(cellIndex);

            if (!this.checkCell(cellIndex) && !this.safeCells.includes(cellIndex)) {
                if (neighbours <= 0) this.cleanCell(cellIndex, true);
                else this.cleanCell(cellIndex, false);
            }
        });
    };

    checkNeighbourMines = (index) => {
        let adjacentCells = this.getAdjacentCells(index);

        let foundMines = 0;
        adjacentCells.forEach((cellIndex, _) => {
            if (this.checkCell(cellIndex)) foundMines++;
        });

        return foundMines;
    };

    // Reveals all hidden mines in the board
    revealAllMines = () => {

        this.cells.forEach((tile, index) => {
            if (this.mines.includes(index)) {
                tile.classList.add('mine-cell');
                tile.innerText = "💣";
            };
        });
    };

    // Returns the adjacent cells indexes of a certain cell index
    getAdjacentCells = (index) => {

        const adjacent = [];

        const row = Math.floor(index / this.columns);
        const col = index % this.columns;

        // Iterate over the 8 possible directions
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {

                // Skip self
                if (r === 0 && c === 0) continue;

                const newRow = row + r;
                const newCol = col + c;

                // Check bounds
                if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.columns) {
                    const newIndex = newRow * this.columns + newCol;
                    adjacent.push(newIndex);
                }
            }
        }

        return adjacent;
    };

    // Returns a random int in the given max range
    getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };
}

new Minesweeper();