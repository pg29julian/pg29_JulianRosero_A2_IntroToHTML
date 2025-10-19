import GameBoard from '../modules/gameBoard.js';
import GameLogic from '../modules/gameLogic.js';
import UserInput from '../modules/userInput.js';

class GameEngine {

    constructor(containerId) {

        this.containerId = containerId;

        // Decorator pattern
        this.gameBoard = new GameBoard();
        this.gameLogic = new GameLogic(this.gameBoard);
        this.userInput = new UserInput(this.gameLogic);
    }

}

export default GameEngine;