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

        // Buttons

        this.newGameButton = document.querySelector('#new_game_button');
        this.beginnerButton = document.querySelector('#beginner_button');
        this.mediumButton = document.querySelector('#medium_button');
        this.expertButton = document.querySelector('#expert_button');

        // Add event listeners

        this.newGameButton.addEventListener('click', () => this.gameLogic.newGame(0));
        this.beginnerButton.addEventListener('click', () => this.gameLogic.newGame(0));
        this.mediumButton.addEventListener('click', () => this.gameLogic.newGame(1));
        this.expertButton.addEventListener('click', () => this.gameLogic.newGame(2));
    }

}

export default GameEngine;