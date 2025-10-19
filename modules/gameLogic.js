class GameLogic {

    constructor(gameBoard) {

        // Variables

        this.gameBoard = gameBoard;

        this.minesGenerated = false;
        this.isGameOver = false;

        // Auto init on begginer level
        this.init(0)
    }

    init = (levelIndex) => {

        // Reset variables

        this.minesGenerated = false;
        this.isGameOver = false;

        // Initialize board

        if (levelIndex == 0) {
            this.gameBoard.init(9, 9, 81, 10);
        }
        else if (levelIndex == 1) {
            this.gameBoard.init(16, 16, 256, 30);
        }
        else if (levelIndex == 2) {
            this.gameBoard.init(16, 25, 400, 50);
        }
    }

    // Starts a new game with the given difficulty setting
    newGame = (index) => {
        this.init(index);
    };

    // Calls interacting with a cell functionality depending on context
    interactWithCell = (index) => {

        // If game is over return
        if (this.isGameOver) return;

        // If first click, generate mines
        if (!this.minesGenerated) {
            this.gameBoard.generateMines(index);
            this.minesGenerated = true;
        }

        // Call tile evaluation
        let interaction = this.gameBoard.checkCell(index);

        // Evaluate interaction result
        if (interaction == "lose") {
            this.isGameOver = true;
            alert("Ops! You stepped on a mine :(");
        }
        else if (interaction == "win") {
            this.isGameOver = true;
            alert("All mines found, good job!");
        }
    }

    // Calls flagging a cell functionality depending on context
    flagCell = (index) => {

        this.gameBoard.flagCell(index);
    }
}

export default GameLogic;