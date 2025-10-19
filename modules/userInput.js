class UserInput {

    constructor(gameLogic) {

        this.gameLogic = gameLogic;

		// Input

		this.boundHandlerLeftClick = this.handleLeftClick.bind(this);
		this.boundHandleRightClick = this.handleRightClick.bind(this);

        this.addEventListeners();

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

	// Add event listeners
	addEventListeners() {

		const container = document.querySelector('#board');

		container?.addEventListener('click', this.boundHandlerLeftClick);
		container?.addEventListener('contextmenu', this.boundHandleRightClick)
		container?.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		});
	}

    // Handles left click functionality
	handleLeftClick(event) {

		const cell = event.target.closest('.cell');

		if (!cell) return;

		const index = parseInt(cell.dataset.index, 10);
		this.gameLogic.interactWithCell(index);
	}

    // Handles right click (flagging) functionality
	handleRightClick(event) {

		const cell = event.target.closest('.cell');

		if (!cell) return;

		const index = parseInt(cell.dataset.index, 10);
		this.gameLogic.flagCell(index);
	}

}

export default UserInput;